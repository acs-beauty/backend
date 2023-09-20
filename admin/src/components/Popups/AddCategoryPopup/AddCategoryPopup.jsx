import React from "react";
import styles from "./AddCategoryPopup.module.scss";
import Toggler from "../../Toggler/Toggler";
import AddIcon from "../../../svgs/AddIcon";
import VioletButton from "../../VioletButton/VioletButton";
import CloseIcon from "../../../svgs/CloseIcon";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import actionCreators from "../../../store/actions/actionCreators";
import * as Yup from "yup";
import { ukraineWordsString, validateLinkString } from "../../../utils/regex";
import { updCategoryRequest } from "../../../store/actions/actionCreators/categories";

const AddCategoryPopup = ({ setActive, ...props }) => {
  const {
    addCategoryRequest,
    updCategoryRequest,
    categories,
    setActiveCategoryId,
    activeCategoryId,
  } = props;
  const categoriesArray = categories.categories;
  const activeCategoryIndex = categoriesArray.findIndex(
    (category) => category.categoryId === activeCategoryId
  );
  const dataField = categoriesArray[activeCategoryIndex];
  return (
    <div className={styles.container}>
      {activeCategoryId ? (
        <h3>Категорії/Редагувати категорію</h3>
      ) : (
        <h3>Категорії/Додати категорію</h3>
      )}
      <div className={styles.popupBody}>
        <div className={styles.heading}>
          <div></div>
          {activeCategoryId ? (
            <h4>РЕДАГУВАТИ КАТЕГОРІЮ</h4>
          ) : (
            <h4>ДОДАТИ КАТЕГОРІЮ</h4>
          )}
          <div
            className={styles.closeIcon}
            onClick={() => {
              setActive(false);
              setActiveCategoryId(null);
            }}
          >
            <CloseIcon />
          </div>
        </div>
        <div className={styles.addImageField}>
          <div className={styles.icon}>
            <AddIcon color={"#5c5e60"} />
          </div>
          {activeCategoryId ? (
            <h5>Редагувати зображення</h5>
          ) : (
            <h5>Додати зображення</h5>
          )}
        </div>
        <Formik
          initialValues={
            activeCategoryId
              ? {
                  categoryId: dataField.categoryId,
                  name: dataField.name,
                  linkKey: dataField.linkKey,
                  disabled: dataField.disabled,
                }
              : { name: "", linkKey: "", disabled: false }
          }
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Обов`язковий")
              .min(3, "Назва має складатися не менше ніж з 3 символів")
              .max(64, "Назва не може перевищувати 64 символи")
              .matches(
                ukraineWordsString,
                "Можна використовувати лише українські літери"
              ),
            linkKey: Yup.string()
              .required("Обов`язковий")
              .min(3, "Посилання має складатися не менше ніж з 3 символів")
              .max(64, "Посилання не може перевищувати 64 символи")
              .matches(
                validateLinkString,
                "Можна використовувати лише латинські літери"
              ),
          })}
          onSubmit={(values) => {
            {
              activeCategoryId
                ? updCategoryRequest(values)
                : addCategoryRequest(values);
            }
            setActive(false);
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, isValid }) => (
            <Form>
              <div>
                <label htmlFor="name">
                  <h6 className={styles.optionName}>Назва категорії</h6>
                </label>
                <Field
                  name="name"
                  type="text"
                  className={styles.field}
                  onChange={handleChange}
                />
                {touched.name && errors.name && (
                  <div className={styles.error}>{errors.name}</div>
                )}
              </div>
              <div>
                <label htmlFor="linkKey">
                  <h6 className={styles.optionName}>URL</h6>
                </label>
                <Field
                  name="linkKey"
                  type="text"
                  className={styles.field}
                  onChange={handleChange}
                />
                {touched.linkKey && errors.linkKey && (
                  <div className={styles.error}>{errors.linkKey}</div>
                )}
              </div>
              <div className={styles.togglerContainer}>
                <Toggler />
              </div>
              <div className={styles.violetButton}>
                <VioletButton
                  onClickFunction={handleSubmit}
                  type={"submit"}
                  buttonText={activeCategoryId ? "ЗБЕРЕГТИ" : "СТВОРИТИ"}
                  radius={"8px"}
                  disabled={!isValid || !touched.name || !touched.linkKey}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addCategoryRequest: (data) =>
    dispatch(actionCreators.addCategoryRequest(data)),
  updCategoryRequest: (data) =>
    dispatch(actionCreators.updCategoryRequest(data)),
});
const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryPopup);
