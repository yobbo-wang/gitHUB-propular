/**
 * NavigationBar
 * @flow
 */
import React, {Component} from 'react';

import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
  Text,
  View,
} from 'react-native';
import GlobalStyles from '../../res/styles/GlobalStyles';
const NAV_BAR_HEIGHT_IOS = GlobalStyles.nav_bar_height_ios;
const NAV_BAR_HEIGHT_ANDROID = GlobalStyles.nav_bar_height_android;
const STATUS_BAR_HEIGHT = 20;
import PropTypes from 'prop-types';
import {isNotch} from '../util/deviceInfo';

export default class NavigationBar extends Component {
  static defaultProps = {
    statusBar: {
      barStyle: 'default',
      hidden: false,
      translucent: false,
      animated: false,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      popEnabled: true,
      hide: false,
    };
  }
  leftView() {
    var leftView = this.props.leftButtonTitle ? (
      <Text style={styles.title}>{this.props.leftButtonTitle}</Text>
    ) : null;
    return (
      <TouchableOpacity onPress={() => this.onLeftButtonClick()}>
        <View
          style={{
            width: 50,
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          {this.props.leftView ? this.props.leftView : leftView}
        </View>
      </TouchableOpacity>
    );
  }

  onLeftButtonClick() {
    if (this.props.navigator && this.props.popEnabled) {
      this.props.navigator.pop();
    }
    if (this.props.onLeftButtonClick) {
      this.props.onLeftButtonClick();
    }
  }

  getButtonElement(data = {}, style) {
    return (
      <View style={styles.navBarButton}>
        {data.props ? (
          data
        ) : (
          <NavBarButton
            title={data.title}
            style={[data.style, style]}
            tintColor={data.tintColor}
            handler={data.handler}
          />
        )}
      </View>
    );
  }

  render() {
    let statusBar = !this.props.statusBar.hidden ? (
      <View style={styles.statusBar}>
        <StatusBar
          {...this.props.statusBar}
          barStyle="light-content"
          style={styles.statusBar}
        />
      </View>
    ) : null;

    let titleView = this.props.titleView ? (
      this.props.titleView
    ) : (
      <Text style={styles.title} ellipsizeMode="head" numberOfLines={1}>
        {this.props.title}
      </Text>
    );

    let content = this.props.hide ? null : (
      <View style={styles.navBar}>
        {/*{this.leftView()}*/}
        {this.getButtonElement(this.props.leftButton)}
        <View
          style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        {/*{this.rightView()}*/}
        {this.getButtonElement(this.props.rightButton, {marginRight: 8})}
      </View>
    );
    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    );
  }
}
class NavBarButton extends Component {
  render() {
    const {style, tintColor, title, handler} = this.props;

    return (
      <TouchableOpacity style={styles.navBarButton} onPress={handler}>
        <View style={style}>
          <Text style={[styles.title, {color: tintColor}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  static propTypes = {
    // style: PropTypes.oneOfType([
    //     PropTypes.object,
    //     PropTypes.array,
    // ]),
    tintColor: PropTypes.string,
    title: PropTypes.string,
    handler: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    title: '',
    tintColor: '#0076FF',
    onPress: () => ({}),
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4caf50',
    paddingTop: isNotch ? 10 : 0,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    // shadowOffset:{
    //     width: 1,
    //     height: 0.5,
    // },
    // shadowColor: '#55ACEE',
    // shadowOpacity: 0.8,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    top: 0,
    right: 40,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    // backgroundColor:'blue',
  },
  navBarButton: {
    alignItems: 'center',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
});
