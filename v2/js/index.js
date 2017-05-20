function SelfVue (data, el) {
    var self = this;
    this.vm = this;
    this.data = data;

    Object.keys(data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(data);
    new Compile(el, this.vm);
    return this;
}

SelfVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newVal) {
                self.data[key] = newVal;
            }
        });
    }
}
