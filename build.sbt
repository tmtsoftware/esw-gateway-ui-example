import org.tmt.sbt.docs.DocKeys._
import org.tmt.sbt.docs.Settings

ThisBuild / scalaVersion := "2.13.8"
ThisBuild / organizationName := "TMT Org"
ThisBuild / docsRepo := "https://github.com/tmtsoftware/tmtsoftware.github.io.git"
ThisBuild / docsParentDir := "esw-gateway-ui-example"
ThisBuild / gitCurrentRepo := "https://github.com/tmtsoftware/esw-gateway-ui-example"

ThisBuild / version := sys.env.getOrElse("JITPACK_VERSION", "0.1.0-SNAPSHOT")

lazy val CSW_VERSION: Option[String] = sys.props.get("prod.publish").collect {
  case "true" => "4.0.1"
}

lazy val ESW_VERSION: Option[String] = sys.props.get("prod.publish").collect {
  case "true" => "0.4.0"
}

lazy val openSite =
  Def.setting {
    Command.command("openSite") { state =>
      val uri = s"file://${Project.extract(state).get(siteDirectory)}/${docsParentDir.value}/${version.value}/index.html"
      state.log.info(s"Opening browser at $uri ...")
      java.awt.Desktop.getDesktop.browse(new java.net.URI(uri))
      state
    }
  }

/* ================= Root Project ============== */
lazy val `esw-gateway-ui-example` = project
  .in(file("."))
  .enablePlugins(GithubPublishPlugin)
  .aggregate(docs)
  .settings(
    commands += openSite.value,
    Settings.makeSiteMappings(docs)
  )

lazy val docs = project
  .enablePlugins(ParadoxMaterialSitePlugin)
  .settings(
    version := {
      sys.props.get("prod.publish") match {
        case Some("true") => version.value
        case _            => "0.1.0-SNAPSHOT"
      }
    },
    paradoxProperties ++= Map(
      "esw-version"             -> ESW_VERSION.getOrElse("0.5.0"),
      "csw-version"             -> CSW_VERSION.getOrElse("5.1.0")
    )
  )

