# Adding Paradox Documentation

The section of the tutorial describes how to write documentation for your application using [paradox](https://developer.lightbend.com/docs/paradox/current/getting-started.html).
Documentation is written in GitHub-flavored markdown, which is documented [here](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax.)

## Pre-requisite

Your application code is checked in some repo in your organization GitHub account.

## Documentation Development Flow

The sample application generated from the template contains a `docs` folder.
This is where you will write the documentation files for your project.
The `build.sbt` file contains the setup for this `docs` sbt project.

Launch sbt from your console and run command `makeSite` to construct the documentation pages.
Then run the command `openSite` to open the generated docs in your default browser.

```bash
sbt
sbt:sample> makeSite
sbt:sample> openSite
```

You can modify the various `.md` files present in `docs` folder and repeat above steps and verify your generated
documentation.  Refer to the Paradox documentation to learn more about the documentation system.

## Documentation Publish Flow

The template sets your project up to publish your documentation to GitHub using [GitHub Pages](https://pages.github.com/).
You need to specify the URL of your GitHub repo in the variable `githubRepoUrl` in your top-level `build.sbt` file.
This allows Paradox to use a special branch, `gh-pages`, in your GitHub repository to keep track of your documentation.

Execute `reload` in sbt so that updated URL is available in sbt.

```bash
sbt:sample> reload
```

Create the `gh_pages` branch in your repo following these [quick steps](https://github.com/sbt/sbt-ghpages#initializing-the-gh-pages-branch).
Verify that you see a new branch `gh_pages` in your GitHub repository with an empty commit.

Then, you can run the command `ghpagesPushSite`, to publish your documentation.

```bash
sbt:sample> ghpagesPushSite
```

Verify that you see a new commit in branch `gh_pages`, and branch should contain a folder with name `0.1.0-SNAPSHOT`

Open your published site using URL, `http://{your-username}.github.io/{your-project}/0.1.0-SNAPSHOT/`
