<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0"
 xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
 <html>
 <body>
 <h2>My creatures</h2>
  <table border="1">
	<tr bgcolor="#9acd32">
		<th>Population</th>
		<th>Type</th>
		<th>Facts</th>
	</tr>
	<xsl:for-each select="world/creatures">
	<tr>
		<td><xsl:value-of select="population"/></td>
		<td><xsl:value-of select="class"/></td>
		<td><xsl:value-of select="pyramid"/></td>
	</tr>
	</xsl:for-each>
   </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>