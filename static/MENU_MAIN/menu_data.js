fixMozillaZIndex=true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
_menuCloseDelay=500;
_menuOpenDelay=150;
_subOffsetTop=10;
_subOffsetLeft=-10;


with(submenuStyle=new mm_style()){
bordercolor="#969698";
borderstyle="solid";
borderwidth=1;
fontfamily="Verdana, Tahoma, Arial";
fontsize="10px";
fontstyle="normal";
fontweight="normal";
itemwidth=132; // HERE IS THE ADDITION
offbgcolor="#ffffff";
offcolor="#000000";
onbgcolor="#B0B0B6";
oncolor="#000000";
outfilter="fade(duration=0.5)";
overfilter="Fade(duration=0.2);Alpha(opacity=90);Shadow(color=#939393', Direction=145, Strength=4)";
padding=3;
separatorcolor="#969698";
subimagepadding=8;
}

with(submenuStyleHome=new mm_style()){
bordercolor="#969698";
borderstyle="solid";
borderwidth=1;
fontfamily="Verdana, Tahoma, Arial";
fontsize="10px";
fontstyle="normal";
fontweight="normal";
itemwidth=100; // HERE IS THE ADDITION
offbgcolor="#ffffff";
offcolor="#000000";
onbgcolor="#B0B0B6";
oncolor="#000000";
outfilter="fade(duration=0.5)";
overfilter="Fade(duration=0.2);Alpha(opacity=90);Shadow(color=#939393', Direction=145, Strength=4)";
padding=3;
separatorcolor="#969698";
subimagepadding=8;
}

with(menuStyle=new mm_style()){
styleid=1;
bgimage="http://www.ariesautomotive.com/MENU_MAIN/baseline_button_off.gif";
bordercolor="#4D4D4D";
borderstyle="solid";
fontfamily="Verdana, Tahoma, Arial";
fontsize="10px";
fontstyle="normal";
fontweight="bold";
//image="http://www.ariesautomotive.com/MENU_MAIN/folder.gif";
itemheight=30;
itemwidth=139;
offcolor="#000000";
oncolor="#660000";
overbgimage="http://www.ariesautomotive.com/MENU_MAIN/baseline_button_off_over.gif";
//overimage="http://www.ariesautomotive.com/MENU_MAIN/openfolder.gif";
subimagepadding=2;
clickbgimage="http://www.ariesautomotive.com/MENU_MAIN/baseline_button_on.gif";
}

with(milonic=new menuname("Main Menu")){
alwaysvisible=1;
left=17;
orientation="horizontal";
style=menuStyle;
top=17;
aI("align=center;showmenu=Home;bgimage=/MENU_MAIN/baseline_back.gif;fontsize=12;fontstyle=bold;fontweight=bold;image=/MENU_MAIN/transparent.gif;itemwidth=100;overbgimage=/MENU_MAIN/baseline_back.gif;overimage=/MENU_MAIN/transparent.gif;status=Aries Automotive Home Page;text=HOME PAGE;url=http://www.ariesautomotive.com;");
aI("align=center;showmenu=NewItems;status=NEW ARIES PRODUCTS;text=New Products;");
aI("align=center;showmenu=Bars;status=ALL ARIES BARS;text=All Aries Bars;");
aI("align=center;showmenu=Vehicle;status=VEHICLE SPECIFIC;text=Vehicle Specific;");
aI("align=center;status=PRO-SERIES;text=PRO-Series Sides;url=http://www.ariesautomotive.com/pro_series.html;");
aI("align=center;status=GLO STEP;text=GLO Step Ovals;url=http://www.ariesautomotive.com/glostep.html;");
aI("align=center;status=4'' OVAL SIDES;text=4'' Oval Sides;url=http://www.ariesautomotive.com/ovals.html;");
aI("align=center;status=MISC ITEMS;showmenu=Misc Items;text=Misc Items;");
aI("align=center;status=APPLICATION GUIDES;showmenu=Applications;text=Application Guides;");
}

with(milonic=new menuname("Home")){
left="offset=2";
openstyle="down";
style=submenuStyleHome;
aI("text=Terms/Conditions;url=http://www.ariesautomotive.com/terms.html;status=TERMS AND CONDITIONS;");
aI("text=Online Warranty Registration;url=http://ariesautomotive.com/warranty/registration.html;status=ONLINE WARRANTY REGISTRATION;");
}

with(milonic=new menuname("Vehicle")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=Fiat 500;url=http://www.ariesautomotive.com/Fiat500.html;");
aI("text=Mini Cooper;url=http://www.ariesautomotive.com/MiniCooper.html;");
aI("text=Smart Car;url=http://www.ariesautomotive.com/SmartCar.html;");
aI("text=Transit Connect;url=http://www.ariesautomotive.com/transit.html;");
aI("text=Toyota FJ;url=http://www.ariesautomotive.com/fj.html;");
aI("text=Jeep Products;url=http://www.ariesjeep.com;");
}

with(milonic=new menuname("Applications")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=GRILL/BRUSH GUARD;url=http://www.ariesautomotive.com/applications/grill-brush-guard.html;");
aI("text=PRO-SERIES GG;url=http://www.ariesautomotive.com/applications/pro-seriesgg.html;");
aI("text=3'' BULL BAR;url=http://www.ariesautomotive.com/applications/bullbar.html;");
aI("text=4'' BIG HORN BULL BAR;url=http://www.ariesautomotive.com/applications/big-horn.html;");
aI("text=SPORT BAR;url=http://www.ariesautomotive.com/applications/sportbar.html;");
aI("text=SIDEBARS;url=http://www.ariesautomotive.com/applications/sidebars.html;");
aI("text=BIG STEP BAR;url=http://www.ariesautomotive.com/applications/big-step.html;");
aI("text=4'' OVAL TUBES;url=http://www.ariesautomotive.com/applications/oval-tubes.html;");
aI("text=6'' OVAL TUBES;url=http://www.ariesautomotive.com/applications/6''-oval-tubes.html;");
aI("text=PRO-SERIES;url=http://www.ariesautomotive.com/applications/pro-series.html;");
aI("text=GLO STEP;url=http://www.ariesautomotive.com/applications/glo-step.html;");
aI("text=WHEEL TO WHEEL;url=http://www.ariesautomotive.com/applications/wheeltowheel.html;");
aI("text=KIA SOUL ACC.;url=http://www.ariesautomotive.com/applications/kia-soul.html;");
aI("text=FIAT 500;url=http://www.ariesautomotive.com/applications/fiat-500.html;");
aI("text=MINI COOPER ACC.;url=http://www.ariesautomotive.com/applications/MiniCooper.html;");
aI("text=SMART CAR ACC.;url=http://www.ariesautomotive.com/applications/Smart-Car.html;");
aI("text=MISC ACCESSORIES;url=http://www.ariesautomotive.com/applications/misc-accessories.html;");
aI("text=COMM.STEEL ACC.;url=http://www.ariesautomotive.com/applications/commercial.html;");
}

with(milonic=new menuname("Misc Items")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=Headache Racks;url=http://www.ariesautomotive.com/headacheracks.html;");
aI("text=Security Lock Box;url=http://www.ariesautomotive.com/securitybox.html;");
aI("text=Universal Mud Flaps;url=http://www.ariesautomotive.com/universalmudflaps.html;");
aI("text=Specialty Items;url=http://www.ariesautomotive.com/specialty.html;");
aI("text=Sales Support;url=http://www.ariesautomotive.com/salessupport.html;");
}

with(milonic=new menuname("NewItems")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=6'' Oval Sides;url=http://www.ariesautomotive.com/6ovals.html;");
aI("text=GLO-Step;url=http://www.ariesautomotive.com/glostep.html;");
aI("text=PRO-Series;url=http://www.ariesautomotive.com/proseriesgrill.html;");
aI("text=Universal Mud Flaps;url=http://www.ariesautomotive.com/universalmudflaps.html;");
aI("text=Jeep Products;url=http://www.ariesjeep.com;");
aI("text=Interior Products;url=http://www.ariesautomotiveinterior.com;");
}

with(milonic=new menuname("Bars")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=One Piece Grill Guard;url=http://ariesautomotive.com/aries_bar.html;");
aI("text=Bull Bar;url=http://www.ariesautomotive.com/bull_bar.html;");
aI("text=Big Horn;url=http://www.ariesautomotive.com/big_horn.html;");
aI("text=Sport Bar;url=http://www.ariesautomotive.com/sport_bar.html;");
aI("text=3'' Side Bars;url=http://www.ariesautomotive.com/sidebars.html;");
aI("text=4'' Big Step;url=http://www.ariesautomotive.com/big_step.html;");
aI("text=4'' Oval Sides;url=http://www.ariesautomotive.com/ovals.html;");
aI("text=6'' Oval Sides;url=http://www.ariesautomotive.com/6ovals.html;");
aI("text=GLO-Step;url=http://www.ariesautomotive.com/glostep.html;");
aI("text=PRO-Series;url=http://www.ariesautomotive.com/proseriesgrill.html;");
}

with(milonic=new menuname("MyMilonic")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=Login;url=http://www.milonic.com/login.php;");
aI("text=Licenses;url=http://www.milonic.com/mylicenses.php;");
aI("text=Invoices;url=http://www.milonic.com/myinvoices.php;");
aI("text=Make Support Request;url=http://www.milonic.com/reqsupport.php;");
aI("text=View Support Requests;url=http://www.milonic.com/mysupport.php;");
aI("text=Your Details;url=http://www.milonic.com/mydetails.php;");
}

drawMenus();

