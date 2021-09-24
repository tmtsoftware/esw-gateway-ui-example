
# Release steps

1. Make sure `esw-gateway-ui-template.g8` is green after following its release steps
2. update `ESW` & `CSW` versions in `build.sbt` & `esw-ts` version in `package.json`.
3. Run `npm install` so that `package-lock.json` also gets updated version.
4. update `sbt-docs` versions in top level `plugins.sbt` used by `docs` project
5. Commit and push changes
6. create appropriate release tag using git and push the tag e.g. `git tag v0.1.0-RC1` and `git push origin v0.1.0-RC1`
7. Run `sbt -Dprod.publish=true` and run `ghpagesPushSite` command inside sbt.
