Ext.onReady(function()	{
	//---Constants---//
	var CENTER_BORDER_LAYOUT_PADDING = "5 0 5 0",
		CONNECTIONS_TREE_PANEL_MODEL_NAME = "HeidiViewportConnectionsTreePanelModel";


	//---Connections TreePanel---//
	var connectionsTreePanelProxy = Ext.create("Ext.data.proxy.Memory", {
		read:function()	{
debugger;
		},
		reader:{
			type:"json"
		}
	});
	
	if(!Ext.ModelManager.getModel(CONNECTIONS_TREE_PANEL_MODEL_NAME))	{
		Ext.define(CONNECTIONS_TREE_PANEL_MODEL_NAME, {
			extend:"Ext.data.Model",
			fields:[
				"id",
				"connectionId",
				"type",
				"text",
				"iconCls",
				"proxyType"
			]
		});
	}
	
	var connectionsTreePanel = Ext.create("Ext.tree.Panel", {
		region:"west",
		width:250,
		padding:CENTER_BORDER_LAYOUT_PADDING,
		store:{
			xtype:"treestore",
			model:CONNECTIONS_TREE_PANEL_MODEL_NAME,
			proxy:connectionsTreePanelProxy
		},
		useArrows:true,
		rootVisible:false,
		singleExpand:true
	});


	//---Define Singleton---//
	Heidi.container.Viewport = Ext.create("Ext.container.Viewport", {
		layout:"fit",
		items:[
			{
				xtype:"panel",
				title:"HeidiJS",
				iconCls:"icon-viewport-heidi-js",
				layout:"border",
				border:false,
				items:[
					{
						xtype:"toolbar",
						region:"north",
						border:false,
						items:[
							{
								text:"Test"
							}
						]
					},
					{
						xtype:"container",
						region:"center",
						layout:{
							type:"border"
						},
						border:false,
						defaults:{
							split:true
						},
						items:[
							connectionsTreePanel,
							{
								xtype:"tabpanel",
								region:"center",
								padding:CENTER_BORDER_LAYOUT_PADDING,
								items:[
									{
										xtype:"panel",
										title:"Host",
										html:"host"
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						region:"south",
						height:150,
						html:"test",
						resizable:true,
						dockedItems:[
							{
								xtype:"toolbar",
								dock:"bottom",
								items:[
									{
										text:"Status"
									}
								]
							}
						]
					}
				],
				dockedItems:[
					{
						xtype:"toolbar",
						dock:"top",
						items:[
							{
								text:"File"
							}
						]
					}
				]
			}
		],
		
		addConnection:function(inConnectionId)	{
			var connectionInformation = Heidi.window.ConnectionManager.getConnectionInformation(inConnectionId),
				connectionNode = Ext.create(CONNECTIONS_TREE_PANEL_MODEL_NAME, {
					id:connectionInformation.connectionId,
					connectionId:connectionInformation.connectionId,
					type:"connection",
					text:connectionInformation.name,
					iconCls:"icon-connections-connection",
					proxyType:connectionInformation.proxyType
				});
			
			connectionsTreePanel.store.tree.root.appendChild(connectionNode);
			connectionNode.expand();
		}
	});
});