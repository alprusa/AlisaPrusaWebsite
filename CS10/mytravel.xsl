<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="world">
 <html>
	<head><title>Fun With Photoshop</title>
	 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	 <style type="text/css">
	  body {background-color : #E6DCD6; color : #4C4A47;
	  font-family : helvetica; width:800px; padding-left:70px}
   </style>
  </head>
  <body>
	<h2> Funny creatures </h2>
	<p style="text-align:center"> <i>
	This page is about my own created world </i></p>
	<hr width="40%"/>
  <xsl:apply-templates/>
 </body>
</html>
</xsl:template>

<xsl:template match="species">
 <table width = "500">
	<xsl:apply-templates/>
</table>

</xsl:template>

<xsl:template match="class">
 <br>
 <tr> <td> <h3>
	<xsl:apply-templates/> </h3>
 </td></tr>
 </br>

</xsl:template>

<xsl:template match="pyramid">
 <tr><td style="text-size:xsmall; padding-left:10px">
  <img src="{@pic}" alt="Cut and Paste" width = "120"
	style = "float:left;padding-right:8px"/>
  <xsl:apply-templates/>
 </td> </tr>
</xsl:template>
</xsl:stylesheet>