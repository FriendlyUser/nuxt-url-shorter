(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{164:function(t,e,n){"use strict";n.r(e);n(46);var o=n(30),c=n(45);console.log("test script");var i,r=o.ethers.getDefaultProvider("kovan"),a=o.ethers.Wallet.createRandom();a=a.connect(r),console.log(c.default);var l={mounted:function(){this.initContract(),this.redirect()},methods:{initContract:function(){var t=c.default;console.log(t),a=(a=o.ethers.Wallet.createRandom()).connect(r),i=new o.ethers.Contract("0x22559cb4b23daaccfad5715a976310f8f7dbc09b",t,a),console.log(i)},redirect:function(){var t=window.location.href.split("?id=")[1];t&&i.getLink(t).then(function(t){window.location.href=t[1]}).catch(function(t){return window.alert("INVALID ID VALUE")})}}},s=n(15),d=Object(s.a)(l,function(){var t=this.$createElement;return(this._self._c||t)("section",{staticClass:"container"},[this._v("\n      Prepare to get redirected\n  ")])},[],!1,null,null,null);d.options.__file="_id.vue";e.default=d.exports}}]);