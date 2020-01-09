import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import Actions from 'actions';
import { HeaderRight } from 'components/common/ui';
import Screens from 'constants/screens';
import Selectors from 'selectors';
import validationSchema from './PostFormValidations';
import PostForm from './PostForm';

const enhancer = withFormik({
  validateOnChange: false,
  validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    const { dispatch, navigation } = props;
    const onSuccess = () => navigation.navigate(Screens.PROFILE);

    dispatch(); // Missing Action
    setSubmitting(false);
  },

  mapPropsToValues: () => ({
    headline: '',
    price: '',
    quantity: '',
    autoReply: '',
    accessImage: '',
    accessImageMeta: '',
  }),
});

class NewPostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state: { params } } = navigation;

    return {
      ...params,
      headerTitle: 'new experience/access',
    };
  };

  componentDidMount() {
    this.configureHeader();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
  }

  configureHeader = () => {
    const { handleSubmit, navigation } = this.props;
    navigation.setParams({
      headerRight: <HeaderRight text="Post" onPress={handleSubmit} />,
    });
  };

  render() {
    const { post } = this.props;
    return (
      <PostForm
        {...this.props}
        post={post}
        onRef={ref => { this.form = ref; }}
      />
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  post: // missing Selector
});

export default connect(mapStateToProps)(enhancer(NewPostScreen));
