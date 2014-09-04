<!--

/*
Configure menu styles below
NOTE: To edit the link colors, go to the STYLE tags and edit the ssm2Items colors
*/
YOffset=10; // no quotes!!
XOffset=2;
staticYOffset=30; // no quotes!!
slideSpeed=20 // no quotes!!
waitTime=100; // no quotes!! this sets the time the menu stays out for after the mouse goes off it.
menuBGColor="333333";
menuIsStatic="yes"; //this sets whether menu should stay static on the screen
menuWidth=160; // Must be a multiple of 10! no quotes!!
menuCols=1;
hdrFontFamily="verdana";
hdrFontSize="2";
hdrFontColor="white";
hdrBGColor="#333333";
hdrAlign="left";
hdrVAlign="center";
hdrHeight="15";
linkFontFamily="Verdana";
linkFontSize="2";
linkBGColor="white";
linkOverBGColor="#FFcc00";
linkTarget="_top";
linkAlign="Left";
barBGColor="#333333";
barFontFamily="Verdana";
barFontSize="2";
barFontColor="white";
barVAlign="center";
barWidth=30; // no quotes!!
barText='<IMG border="0" src="/images/app_menu_tab.gif" width="30" height="280">'; // <IMG> tag supported. Put exact html for an image to show.

///////////////////////////

// ssmItems[...]=[name, link, target, colspan, endrow?] - leave 'link' and 'target' blank to make a header
ssmItems[0]=["Aries Bars"] //create header
ssmItems[1]=["GRILL/BRUSH GUARD", "/applications/grill-brush-guard.html", "_parent"]
ssmItems[2]=["PRO-SERIES GG", "/applications/pro-seriesgg.html", "_parent"]
ssmItems[3]=["3'' BULL BAR", "/applications/bullbar.html", "_parent"]
ssmItems[4]=["4'' BIG HORN BULL BAR", "/applications/big-horn.html", "_parent"]
ssmItems[5]=["SPORT BAR", "/applications/sportbar.html", "_parent"]
ssmItems[6]=["SIDEBARS", "/applications/sidebars.html", "_parent"]
ssmItems[7]=["BIG STEP", "/applications/big-step.html", "_parent"]
ssmItems[8]=["4'' OVAL TUBES", "/applications/oval-tubes.html", "_parent"]
ssmItems[9]=["6'' OVAL TUBES", "/applications/6''-oval-tubes.html", "_parent"]
ssmItems[10]=["PRO-SERIES SIDES", "/applications/pro-series.html", "_parent"]
ssmItems[11]=["GLO STEP", "/applications/glo-step.html", "_parent"]
ssmItems[12]=["WHEEL TO WHEEL", "/applications/wheeltowheel.html", "_parent"]
ssmItems[13]=["Vehicle Specific"] //create header
ssmItems[14]=["KIA SOUL", "/applications/kia-soul.html", "_parent"]
ssmItems[15]=["H2/H3", "/applications/hummer-applications.html", "_parent"]
ssmItems[16]=["FIAT 500", "/applications/fiat-500.html", "_parent"]
ssmItems[17]=["MINI COOPER", "/applications/mini-cooper.html", "_parent"]
ssmItems[18]=["SMART CAR", "/applications/smart-car.html", "_parent"]
ssmItems[19]=["Aries Jeep"] //create header
ssmItems[20]=["JEEP ACCESSORIES WEBSITE", "http://www.ariesjeep.com", "_parent"]
ssmItems[21]=["Accessories"] //create header
ssmItems[22]=["CHROME", "/applications/misc-accessories.html", "_parent"]
ssmItems[23]=["LIGHT TABS", "/applications/misc-accessories.html", "_parent"]
ssmItems[24]=["UNIVERSAL MUD FLAPS", "/applications/misc-accessories.html", "_parent"]
ssmItems[25]=["COMMERCIAL STEEL", "/applications/commercial.html", "_parent"]
ssmItems[26]=["Aries Interior"] //create header
ssmItems[27]=["3D FLOOR LINERS", "http://ariesautomotiveinterior.com/3D-Floor-Liners_Application.htm", "_parent"]
ssmItems[28]=["SEAT DEFENDER", "http://ariesautomotiveinterior.com/SeatDefender_Application.htm", "_parent"]
buildMenu();

//-->