/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
import FactoryMaker from '../../core/FactoryMaker.js';
import Utils from '../../core/Utils.js';

/**
 * @module XHRLoader
 * @ignore
 * @description Manages download of resources via HTTP.
 */
function XHRLoader() {

    let instance;

    function load(httpRequest /* CommonMediaLibrary.request.CommonMediaRequest */, httpResponse /* CommonMediaLibrary.request.CommonMediaResponse */) {
        let xhr = new XMLHttpRequest();
        xhr.open(httpRequest.method, httpRequest.url, true);

        if (httpRequest.responseType) {
            xhr.responseType = httpRequest.responseType;
        }

        if (httpRequest.headers) {
            for (let header in httpRequest.headers) {
                let value = httpRequest.headers[header];
                if (value) {
                    xhr.setRequestHeader(header, value);
                }
            }
        }

        xhr.withCredentials = httpRequest.credentials === 'include';

        xhr.onload = function(e) {
            httpResponse.url = this.responseURL;
            httpResponse.status = this.status;
            httpResponse.statusText = this.statusText;
            httpResponse.headers = Utils.parseHttpHeaders(this.getAllResponseHeaders());
            httpResponse.data = this.response;
            httpRequest.onload(e);
        }
        xhr.onloadend = httpRequest.onloadend;
        xhr.onerror = httpRequest.onerror;
        xhr.onprogress = httpRequest.onprogress;
        xhr.onabort = httpRequest.onabort;
        xhr.ontimeout = httpRequest.ontimeout;

        xhr.send();

        httpRequest.abort = abort.bind(xhr);
        return true;
    }

    function abort() {
        // this = xhr
        this.onloadend = this.onerror = this.onprogress = null; // Ignore events from aborted requests.
        this.abort();
    }

    instance = {
        load,
        abort
    };

    return instance;
}

XHRLoader.__dashjs_factory_name = 'XHRLoader';

const factory = FactoryMaker.getClassFactory(XHRLoader);
export default factory;
