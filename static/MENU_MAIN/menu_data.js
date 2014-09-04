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
bgimage="/images/baseline_button_off.gif";
bordercolor="#4D4D4D";
borderstyle="solid";
fontfamily="Verdana, Tahoma, Arial";
fontsize="10px";
fontstyle="normal";
fontweight="bold";
//image="/MENU_MAIN/folder.gif";
itemheight=30;
itemwidth=139;
offcolor="#000000";
oncolor="#660000";
overbgimage="/images/baseline_button_off_over.gif";
//overimage="/MENU_MAIN/openfolder.gif";
subimagepadding=2;
clickbgimage="/images/baseline_button_on.gif";
}

with(milonic=new menuname("Main Menu")){
alwaysvisible=1;
left=17;
orientation="horizontal";
style=menuStyle;
top=17;
aI("align=center;showmenu=Home;bgimage=/images/baseline_back.gif;fontsize=12;fontstyle=bold;fontweight=bold;image=/images/transparent.gif;itemwidth=100;overbgimage=/images/baseline_back.gif;overimage=/images/transparent.gif;status=Aries Automotive Home Page;text=HOME PAGE;url=/;");
aI("align=center;showmenu=NewItems;status=NEW ARIES PRODUCTS;text=New Products;");
aI("align=center;showmenu=Bars;status=ALL ARIES BARS;text=All Aries Bars;");
aI("align=center;showmenu=Vehicle;status=VEHICLE SPECIFIC;text=Vehicle Specific;");
aI("align=center;status=PRO-SERIES;text=PRO-Series Sides;url=/pro_series.html;");
aI("align=center;status=GLO STEP;text=GLO Step Ovals;url=/glostep.html;");
aI("align=center;status=4'' OVAL SIDES;text=4'' Oval Sides;url=/ovals.html;");
aI("align=center;status=MISC ITEMS;showmenu=Misc Items;text=Misc Items;");
aI("align=center;status=APPLICATION GUIDES;showmenu=Applications;text=Application Guides;");
}

with(milonic=new menuname("Home")){
left="offset=2";
openstyle="down";
style=submenuStyleHome;
aI("text=Terms/Conditions;url=/terms.html;status=TERMS AND CONDITIONS;");
aI("text=Online Warranty Registration;url=/warranty/registration.html;status=ONLINE WARRANTY REGISTRATION;");
}

with(milonic=new menuname("Vehicle")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=Fiat 500;url=/Fiat500.html;");
aI("text=Mini Cooper;url=/MiniCooper.html;");
aI("text=Smart Car;url=/SmartCar.html;");
aI("text=Transit Connect;url=/transit.html;");
aI("text=Toyota FJ;url=/fj.html;");
aI("text=Jeep Products;url=http://www.ariesjeep.com;");
}

with(milonic=new menuname("Applications")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=GRILL/BRUSH GUARD;url=/applications/grill-brush-guard.html;");
aI("text=PRO-SERIES GG;url=/applications/pro-seriesgg.html;");
aI("text=3'' BULL BAR;url=/applications/bullbar.html;");
aI("text=4'' BIG HORN BULL BAR;url=/applications/big-horn.html;");
aI("text=SPORT BAR;url=/applications/sportbar.html;");
aI("text=SIDEBARS;url=/applications/sidebars.html;");
aI("text=BIG STEP BAR;url=/applications/big-step.html;");
aI("text=4'' OVAL TUBES;url=/applications/oval-tubes.html;");
aI("text=6'' OVAL TUBES;url=/applications/6''-oval-tubes.html;");
aI("text=PRO-SERIES;url=/applications/pro-series.html;");
aI("text=GLO STEP;url=/applications/glo-step.html;");
aI("text=WHEEL TO WHEEL;url=/applications/wheeltowheel.html;");
aI("text=KIA SOUL ACC.;url=/applications/kia-soul.html;");
aI("text=FIAT 500;url=/applications/fiat-500.html;");
aI("text=MINI COOPER ACC.;url=/applications/mini-cooper.html;");
aI("text=SMART CAR ACC.;url=/applications/Smart-Car.html;");
aI("text=MISC ACCESSORIES;url=/applications/misc-accessories.html;");
aI("text=COMM.STEEL ACC.;url=/applications/commercial.html;");
}

with(milonic=new menuname("Misc Items")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=Headache Racks;url=/headacheracks.html;");
aI("text=Security Lock Box;url=/securitybox.html;");
aI("text=Universal Mud Flaps;url=/universalmudflaps.html;");
aI("text=Specialty Items;url=/specialty.html;");
aI("text=Sales Support;url=/salessupport.html;");
}

with(milonic=new menuname("NewItems")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=6'' Oval Sides;url=/6ovals.html;");
aI("text=GLO-Step;url=/glostep.html;");
aI("text=PRO-Series;url=/proseriesgrill.html;");
aI("text=Universal Mud Flaps;url=/universalmudflaps.html;");
aI("text=Jeep Products;url=http://www.ariesjeep.com;");
aI("text=Interior Products;url=http://www.ariesautomotiveinterior.com;");
}

with(milonic=new menuname("Bars")){
left="offset=2";
openstyle="down";
style=submenuStyle;
aI("text=One Piece Grill Guard;url=/aries_bar.html;");
aI("text=Bull Bar;url=/bull_bar.html;");
aI("text=Big Horn;url=/big_horn.html;");
aI("text=Sport Bar;url=/sport_bar.html;");
aI("text=3'' Side Bars;url=/sidebars.html;");
aI("text=4'' Big Step;url=/big_step.html;");
aI("text=4'' Oval Sides;url=/ovals.html;");
aI("text=6'' Oval Sides;url=/6ovals.html;");
aI("text=GLO-Step;url=/glostep.html;");
aI("text=PRO-Series;url=/proseriesgrill.html;");
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

