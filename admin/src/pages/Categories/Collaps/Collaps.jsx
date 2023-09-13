import React, { useState } from "react";
import styles from "./Collaps.module.scss";
import ArrowToRight from "../../../svgs/ArrowToRight";
import ChangeIcon from "../../../svgs/ChangeIcon";
import DeleteIcon from "../../../svgs/DeleteIcon";
import AddIcon from "../../../svgs/AddIcon";
import Subcategory from "./Subcategory/Subcategory";
import AddSubcategoryPopup from "../../../components/Popups/AddSubcategoryPopup/AddSubcategoryPopup";
import ArrowToBottomIcon from "../../../svgs/ArrowToBottomIcon";
import { connect } from "react-redux";
import actionCreators from "../../../store/actions/actionCreators";

const Collaps = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active, setActive] = useState(false);
  const { name, categoryId, subcategories } = props.data;
  const { delCategoryRequest} = props;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setActive(false);
  };
  const showAddSubcategoryPopup = () => {
    setIsCollapsed(true);
    setActive(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collapsContainer}>
        <div></div>
        <div className={styles.categoryName}>
          <h2>{name}</h2>
          <div className={styles.actions}>
            <div className={styles.icon}>
              <ChangeIcon />
            </div>
            <div className={styles.icon} onClick={() => delCategoryRequest(categoryId)}>
              <DeleteIcon />
            </div>
            {!active && (
              <div className={styles.icon} onClick={showAddSubcategoryPopup}>
                <AddIcon color={"#FFF"} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.openSubcategoriesArrow} onClick={toggleCollapse}>
          {isCollapsed ? <ArrowToBottomIcon /> : <ArrowToRight />}
        </div>
      </div>
      {isCollapsed && !active && (
        <div className={styles.content}>
          {subcategories.length
            ? subcategories.map((subcategories) => (
                <Subcategory subcategories={subcategories} key={subcategories.subcategoryId} />
              ))
            : null}
        </div>
      )}
      {active && (
        <div className={styles.content}>
          <AddSubcategoryPopup setActive={setActive} categoryId={categoryId}/>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  delCategoryRequest: (id) => dispatch(actionCreators.delCategoryRequest(id)),
});

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collaps);
