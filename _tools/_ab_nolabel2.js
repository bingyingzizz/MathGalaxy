MG.config.showLabels = false;
MG.app.renderer.invalidate();
MG.app.requestDraw();
return { showLabels: MG.config.showLabels };
