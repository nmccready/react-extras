const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const del = require('del');
const program = require('commander');
const fs = require('fs');
const { flattenDeep } = require('lodash');
const { compilerOptions: tsconfig } = require('./tsconfig.json');

const debug = require('./debug').spawn('gulp');

program
  .version(require('./lerna.json').version)
  .option('-p, --package <p>', 'package to use gulp against')
  .parse(process.argv);

// TODO: publish esm as well

let packages = fs.readdirSync('packages');

if (program.package) {
  packages = [program.package];
}

/*
Goal is to produce webpack consumable js in which portions of the library
can be consumed without everything.

Rollup is nice, but it usually puts the whole lib together without making the
sections of lib optional.
*/
const dists = {};

packages.forEach((p) => {
  dists[p] = `packages/${p}/lib`;
});

gulp.task('clean', () => del(Object.values(dists)));

const mapPaths = (paths = [], pack) =>
  paths.map((path) => {
    let ret;
    if (/!.*/.test(path)) {
      ret = `!packages/${pack}/${path.replace('!', '')}`;
    } else {
      ret = `packages/${pack}/${path}`;
    }
    debug(() => ret);
    return ret;
  });

const build = (pack, { transform = () => babel(), exts = ['js', 'ts', 'tsx'] } = {}) => () => {
  const src = mapPaths(
    flattenDeep(
      exts.map((ext) => [
        `src/**/*.${ext}`,
        `!src/**/*.spec*.${ext}`,
        `!src/**/*.story*.${ext}`,
      ])
    ),
    pack
  );
  const dest = dists[pack];

  return gulp
    .src(src)
    .pipe(
      replace(/import(.*)from '@znemz\/(.*)\/src\/(.*)';/g, "import$1from '@znemz/$2/lib/$3';")
    )
    .pipe(transform())
    .pipe(gulp.dest(dest));
};

const types = (pack) => () => {
  const src = mapPaths(['src/**/*.d.ts'], pack);
  const dest = dists[pack];

  return gulp
    .src(src)
    .pipe(
      replace(/import(.*)from '@znemz\/(.*)\/src\/(.*)';/g, "import$1from '@znemz/$2/lib/$3';")
    )
    .pipe(gulp.dest(dest));
};

// babel is being used to compile the TS by default, but tsc generates the index.d.ts
const typescript = (pack) =>
  build(pack, {
    transform: () =>
      ts({
        ...tsconfig,
        // allowJs: true,
        // esModuleInterop: true,
      }),
    exts: ['ts', 'tsx'],
  });

const buildTasks = packages.map((pack) => {
  const taskName = `build:${pack}`;
  // build(pack)
  gulp.task(taskName, gulp.parallel(gulp.series(build(pack), typescript(pack)), types(pack)));
  return taskName;
});

gulp.task('build', gulp.parallel(...buildTasks));

gulp.task('docs:clean', () => del(['docs/**/*.md', 'docs/packages']));

gulp.task('docs:assets', () =>
  gulp
    .src(['docs/images/**/*', 'docs/*.ico'], { base: './docs' })
    .pipe(gulp.dest('public'))
    // deal w/ routing bugs and satisfy assets there as well
    .pipe(gulp.dest('public/docs'))
);

const docsSource = [
  '**/*.md',
  '**/*.mdx',
  '!**/docs/**',
  '!**/node_modules/**',
  '!node_modules',
];

gulp.task(
  'docs',
  gulp.series('docs:clean', () =>
    gulp
      .src(docsSource)
      .pipe(replace(/\/index.md/g, '')) // fix links
      .pipe(
        rename((filePath) => {
          if (filePath.basename === 'README') {
            filePath.basename = 'index';
            if (filePath.dirname === '.') {
              // we're at root README
              filePath.basename = 'docs';
            }
          }
        })
      )
      .pipe(gulp.dest('docs'))
  )
);

gulp.task(
  'docs:watch',
  gulp.series('docs', () => {
    gulp.watch(docsSource, gulp.series('docs'));
  })
);

gulp.task('default', gulp.series('clean', gulp.parallel('build')));
