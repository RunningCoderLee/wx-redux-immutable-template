'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('./immutable');

var _immutable2 = _interopRequireDefault(_immutable);

//
var _utilities = function(){
  var validateNextState = exports.getUnexpectedInvocationParameterMessage = exports.getStateName = undefined;

  var _getStateName2 = function (action) {
   return action && action.type === '@@redux/INIT' ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
  };


var _getStateName3 = _interopRequireDefault(_getStateName2);

var _getUnexpectedInvocationParameterMessage2 = function (state, reducers, action) {


  var _getStateName4 = _interopRequireDefault(_getStateName2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


  var reducerNames = Object.keys(reducers);

  if (!reducerNames.length) {
    return 'Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.';
  }

  var stateName = (0, _getStateName4.default)(action);

  if (_immutable2.default.isImmutable ? !_immutable2.default.isImmutable(state) : !_immutable2.default.Iterable.isIterable(state)) {
    return 'The ' + stateName + ' is of unexpected type. Expected argument to be an instance of Immutable.Collection or Immutable.Record with the following properties: "' + reducerNames.join('", "') + '".';
  }

  var unexpectedStatePropertyNames = state.toSeq().keySeq().toArray().filter(function (name) {
    return !reducers.hasOwnProperty(name);
  });

  if (unexpectedStatePropertyNames.length > 0) {
    return 'Unexpected ' + (unexpectedStatePropertyNames.length === 1 ? 'property' : 'properties') + ' "' + unexpectedStatePropertyNames.join('", "') + '" found in ' + stateName + '. Expected to find one of the known reducer property names instead: "' + reducerNames.join('", "') + '". Unexpected properties will be ignored.';
  }

  return null;
};


var _getUnexpectedInvocationParameterMessage3 = _interopRequireDefault(_getUnexpectedInvocationParameterMessage2);

var _validateNextState2 = function (nextState, reducerName, action) {
  // eslint-disable-next-line no-undefined
  if (nextState === undefined) {
    throw new Error('Reducer "' + reducerName + '" returned undefined when handling "' + action.type + '" action. To ignore an action, you must explicitly return the previous state.');
  }
};

var _validateNextState3 = _interopRequireDefault(_validateNextState2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

return {
  getStateName:_getStateName3.default,
  getUnexpectedInvocationParameterMessage: _getUnexpectedInvocationParameterMessage3.default,
  validateNextState:_validateNextState3.default
}

}

//

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.combineReducers = undefined;

exports.default = function (reducers) {
  var getDefaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _immutable2.default.Map;

  var reducerKeys = Object.keys(reducers);

  // eslint-disable-next-line space-infix-ops
  return function () {
    var inputState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultState();
    var action = arguments[1];


    return inputState.withMutations(function (temporaryState) {
      reducerKeys.forEach(function (reducerName) {
        var reducer = reducers[reducerName];
        var currentDomainState = temporaryState.get(reducerName);
        var nextDomainState = reducer(currentDomainState, action);

        (0, _utilities().validateNextState)(nextDomainState, reducerName, action);

        temporaryState.set(reducerName, nextDomainState);
      });
    });
  };
};

module.exports = exports['default'];

//

//# sourceMappingURL=combineReducers.js.map