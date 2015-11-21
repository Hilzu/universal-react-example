import React from 'react'
import he from 'he'
import assign from 'lodash/object/assign'
import zipObject from 'lodash/array/zipObject'

export const DataRoot = React.createClass({
  propTypes: {
    component: React.PropTypes.func.isRequired,
    initialData: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    initialData: React.PropTypes.object
  },

  getChildContext () {
    return { initialData: this.props.initialData }
  },

  render () {
    const { component: Component, initialData, ...rest } = this.props // eslint-disable-line no-unused-vars
    return <Component {...rest} /> // eslint-disable-line no-undef
  }
})

export function createDataContainer (Component, propSpec) {
  const DataContainer = React.createClass({
    contextTypes: {
      initialData: React.PropTypes.object
    },

    statics: {
      loadInitialProps () {
        const keys = Object.keys(propSpec)
        const values = keys.map(k => propSpec[k])
        return new Promise(function resolvePropSpec (resolve, reject) {
          const promises = values.map(v => {
            if (typeof v === 'function') v = v()
            if (typeof v.then !== 'function') {
              throw new TypeError('Expected value of propSpec entry to be a function returning promise or a promise. Got: ' + typeof v)
            }
            return v
          })

          Promise.all(promises)
            .then((resolvedValues) => {
              resolve(zipObject(keys, resolvedValues))
            })
            .catch(reject)
        })
      },
      getComponentName () {
        return Component.displayName || Component.name
      }
    },

    getInitialState: () => ({
      initialData: {}
    }),

    componentWillMount () {
      const name = DataContainer.getComponentName()
      var initialData = this.context.initialData[name]
      if (!initialData) {
        if (process.browser) {
          DataContainer.loadInitialProps()
            .then(initialData => {
              if (this.isMounted()) this.setState({ initialData })
            }).catch(err => console.error('Failed loading initial data!', err))
        } else {
          console.warn("Couldn't load initial data from context for", DataContainer.getComponentName())
        }
        initialData = {}
      }
      this.setState({ initialData })
    },

    render () {
      const initialData = this.state.initialData
      return <Component {...initialData} {...this.props} /> // eslint-disable-line no-undef
    }
  })

  return DataContainer
}

export function loadInitialForBrowser () {
  const initialDataNode = document.getElementById('initialData')
  if (!initialDataNode) {
    console.warn("Couldn't load initial data from node!")
    return {}
  }
  const content = initialDataNode.textContent
  return JSON.parse(he.decode(content))
}

export function loadInitialFromComponents (components = []) {
  const initialDataPs = components
    .filter(c => typeof c.loadInitialProps === 'function')
    .map(c => c.loadInitialProps()
      .then((data) => ({ [c.getComponentName()]: data })))

  return Promise.all(initialDataPs)
    .then((datas) => assign(...datas))
}
