window.$ = window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        console.log(selectorOrArray)
        elements = document.querySelectorAll(selectorOrArray)

    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    const api = Object.create(jQuery.prototype) //创建一个对象，这个对象的__proto__为括号里的内容

    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArray.oldApi
    })
    return api



}

jQuery.prototype = {
    constructor: jQuery,
    addClass(className) {

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this //return这个对象本身，满足链式调用

    },
    find(selector) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)))
        }
        array.oldApi = this //保留当前对象

        return jQuery(array) // 新创建一个jQuery对象
    },
    end() {
        return this.oldApi
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i])
        }
        return this
    },
    parent() {
        const array = []
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },
    children() {
        const array = []
        this.each((node) => {
            array.push(...node.children) //ES6数组展开
        })
        return jQuery(array)
    },
    print() {
        console.log(this.elements)
    }

}