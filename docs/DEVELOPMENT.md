# DEVELOPMENT GUIDE

## PUBLISHING RELEASES

When it's time to cut a release, increment the version in [`package.json`](../package.json) according to the [Semantic Versioning](http://semver.org/) guidelines.

Run `script/build` and then commit all the changes (`script/build` will build the .map file, which we want in the repository).

Make sure to push that commit to `origin`.

Tag the release with the version in `package.json` and push the tags. For example:

```bash
git tag 0.5.5
git push --tags
```

Now you can go to GitHub to [Draft a new Release](https://github.com/haacked/aspnet-client-validation/releases/new) and click the button to "Auto-generate release notes". Edit the notes accordingly create the Release.


When you cerate the Release, the [`release.yml`](../.github/.workflow.release.yml) workflow builds and publishes the package to NPM.
