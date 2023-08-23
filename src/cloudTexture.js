import { drawPavilions } from "./drawPavilions";
import { drawClouds } from "./drawClouds";

    const targetTextureHeight = 4096;
    const targetTextureWidth = 4096;
    let fb

function GetCloudTexture(gl, programInfo, buffer, parameters){
    const targetTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    
    // define size and format of level 0
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    targetTextureWidth, targetTextureHeight, border,
                    format, type, data);
    
    // set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // Create and bind the framebuffer
    fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    // attach the texture as the first color attachment
    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level);
    gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);
    drawClouds(gl, programInfo, buffer, parameters)
    return targetTexture
}

function UpdateCloudTexture(gl, programInfo, buffer, parameters,targetTexture){
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    
    // Create and bind the framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    // attach the texture as the first color attachment
    gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);
    drawClouds(gl, programInfo, buffer.cloud, parameters)
    return targetTexture
}

export {GetCloudTexture,UpdateCloudTexture}