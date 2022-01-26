export default {
  /**
   * Returns the configuration object associated with the current development stage.
   *
   * @param state
   * @returns Object
   */
  config: function (state) {
    if (window.location.hostname.includes('prev-u.com')) {
      return state.configurations.prod;
    } else {
      return state.configurations.dev;
    }
  }
}
