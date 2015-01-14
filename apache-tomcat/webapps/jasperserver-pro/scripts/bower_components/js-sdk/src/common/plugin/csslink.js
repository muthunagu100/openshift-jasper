/*
 * Copyright (C) 2005 - 2014 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * @author nmarcu@jaspersoft.com
 * @version: $Id: csslink.js 270 2014-10-13 19:58:03Z agodovanets $
 */

/**
 * requirejs plugin to put css link tags inside the head element
 */

define({
    load: function (name, require, onload, config) {
        if (config.isBuild) {
            onload();
            return;
        }

        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = require.toUrl(name);

        // FIXME: probably webfonts could be better identified
        if (link.href.indexOf('font') != 0) {
            link.className = 'jrWebFont';
        }

        document.getElementsByTagName("head")[0].appendChild(link);

        onload();
        return;
    }
});