MG.config.showDefinitionLines = false;
MG.app.renderer.invalidate();
MG.app.requestDraw();
return { defs: MG.config.showDefinitionLines, visible: MG.app.view.visible.length };
