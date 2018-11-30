/**
 * 从给定字符串中解析url参数，默认解析location.search
 */
export const parseQueryString = (search = location && location.search) => {
  if (typeof(search) !== typeof('')) throw new Error('param must be a string')
  if (search.length < 3) return {}
  const query = search[0] === '?' ? search.slice(1) : search
  const reg = /([^=&#]+)=([^&#]*)/ig
  let match = null
  const result = {}
  while (match = reg.exec(query)) {
    result[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }
  return result
}

export const EventListener = {
  listen(el, handlerBaseName, cb) {
    if (el.addEventListener) {
      el.addEventListener(handlerBaseName, cb, false);
    } else if (el.attachEvent) {
      el.attachEvent(`on${handlerBaseName}`, cb);
    }
  },

  capture(el, handlerBaseName, cb) {
    if (!el.addEventListener) {
      console.error('You are attempting to use addEventlistener ' +
            'in a browser that does not support it support it.' +
            'This likely means that you will not receive events that ' +
            'your application relies on (such as scroll).');
      return;
    }
    el.addEventListener(handlerBaseName, cb, true);
  },
};

export const push = (array, items) => {
  if (items === null || items === undefined) return array
  if (items instanceof Array) {
    array.push(...items)
  } else {
    array.push(items)
  }
  return array
}

export const P1Keys = {
  0x57: 'w',
  0x53: 's',
  0x41: 'a',
  0x44: 'd',
  0x00: 'z',
  0x4A: 'A',
  0x4B: 'B',
  0x4C: 'C',
  0xBA: 'D',
};

export const clone = (obj) => JSON.parse(JSON.stringify(obj))

export const merge = (target, source) => {
  for ( let prop in source ) {
    if ( Object.prototype.hasOwnProperty.call( source, prop ) ) {
        target[prop] = source[prop]
    }
  }
}

export const assign = () => {
  const extended = {}
  let deep = false
	let i = 0
  let length = arguments.length
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
		deep = arguments[0]
		i++
  }
  const merge = function (obj) {
		for ( let prop in obj ) {
			if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
				if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
					extended[prop] = extend( true, extended[prop], obj[prop] )
				} else {
					extended[prop] = obj[prop]
				}
			}
		}
  }
  for ( ; i < length; i++ ) {
		merge(arguments[i])
	}
  return extended
}