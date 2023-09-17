import React, { useEffect, useRef, useState } from "react";
import styles from "./Categories.module.scss";
import Collaps from "./Collaps/Collaps";
import VioletButton from "../../components/VioletButton/VioletButton";
import AddCategoryPopup from "../../components/Popups/AddCategoryPopup/AddCategoryPopup";
import { connect } from "react-redux";
import actionCreators from "../../store/actions/actionCreators";

const Categories = (props) => {
  const [active, setActive] = useState(false);
  const {
    getCategoriesRequest,
    categories: { isFetching, categories, error },
  } = props;

  useEffect(() => {
    if (!categories.length) {
      getCategoriesRequest();
    }
  }, []);

  return (
    <>
      <div
        className={styles.container}
        style={{ display: active ? "none" : "" }}
      >
        <div className={styles.heading}>
          <h3>Категорії</h3>
          <VioletButton
            buttonText={"ДОДАТИ КАТЕГОРІЮ"}
            onClickFunction={() => setActive(true)}
          />
        </div>
        <div className={styles.collapses}>
          {categories.length
            ? categories.map((category) => (
                <Collaps data={category} key={category.categoryId} />
              ))
            : null}
        </div>
      </div>
      {active && <AddCategoryPopup setActive={setActive} />}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getCategoriesRequest: () => dispatch(actionCreators.getCategoriesRequest()),
});

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
