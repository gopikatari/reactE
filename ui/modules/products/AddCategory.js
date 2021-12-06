import React, { useState } from "react";
// import * as userReducer from "../../redux/user/user.reducer";
import * as productActions from "../../redux/product/product.actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const AddCategory = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  // const user_info = useSelector((state) => {
  //   return state[userReducer.userFeatureKey];
  // });

  let handleCategoryAdd = (e) => {
    e.preventDefault();
    alert(category);
    if (category.length > 0) dispatch(productActions.addCategory(category));
    else toast.error("Field should not be empty");
    setCategory("");
  };
  return (
    <React.Fragment>
      <section className="paddingTop">
        <div className="container-fluid">
          <div className="row p-3 bg-secondary">
            <div className="col text-white">
              <p className="h4">Add Category !</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="card">
              <div className="card-header bg-info text-white">
                <p className="h3">Category</p>
              </div>
              <div className="card-body">
                <form action="" onSubmit={handleCategoryAdd}>
                  <label className="">Category Name</label>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-sm btn-default"
                      value="Add"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddCategory;
