
exports.isElectron = function() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
};

exports.isMac = function(){
    if (typeof process !== 'undefined' && typeof process.platform === 'string' && process.platform === 'darwin'){
        return true;
    }
    if(typeof navigator === 'object' && typeof navigator.platform === 'string' && navigator.platform.startsWith('Mac')){
        return true;
    }
    return false;
};

exports.isLinux = function(){
    if (typeof process !== 'undefined' && typeof process.platform === 'string' && process.platform === 'linux'){
        return true;
    }
    if(typeof navigator === 'object' && typeof navigator.platform === 'string' && navigator.platform.indexOf('linux') > -1){
        return true;
    }
    return false;
};

exports.isWin = function(){
    if (typeof process !== 'undefined' && typeof process.platform === 'string' && process.platform === 'win32'){
        return true;
    }
    if(typeof navigator === 'object' && typeof navigator.platform === 'string' && navigator.platform.startsWith('Win')){
        return true;
    }
    return false;
};