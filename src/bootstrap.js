//---Overrides---//
Ext.override(Ext.window.Window, {
	constrain:true
});


//---Create Connection Manager---//
Ext.onReady(function()	{
	//---Create New Connection Manager---//
	Heidi.window.ConnectionManager.show();
});