import React, {useState} from 'react';
import * as productActions from '../../redux/products/product.actions';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import * as userReducer from '../../redux/users/user.reducers';

let UploadProduct = () => {
    // get user Info from Redux Store
    let userInfo = useSelector((state) => {
        return state[userReducer.userFeatureKey];
    });

    let {user , loading} = userInfo;

    let dispatch = useDispatch();
    let history = useHistory();

    let [product , setProduct] = useState({
        name : '',
        brand : '',
        price : '',
        qty : '',
        image : '',
        category : '',
        description : '',
        usage : ''
    });

    let updateInput = (event) => {
        setProduct({
            ...product,
            [event.target.name] : event.target.value
        });
    };

    let updateImage = async (event) => {
        let imageFile = event.target.files[0];
        let base64Image = await convertBase64String(imageFile);
        setProduct({
            ...product,
            image : base64Image
        });
    };

    let convertBase64String = (imageFile) => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', () => {
                if(fileReader.result){
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Occurred');
                }
            })
        });
    };

    let submitUploadProduct = (event) => {
        event.preventDefault();
        dispatch(productActions.uploadProduct(product ,history));
    };

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>
                               <i className="fa fa-file-upload"/> Upload Product</h3>
                        </div>
                    </div>
                </div>
            </section>
           {/* <pre>{JSON.stringify(product)}</pre>*/}
            {
                Object.keys(user).length > 0 && user.isAdmin ?
                    <React.Fragment>
                        <section>
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col">
                                        <p className="h3">Upload Products Here</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad beatae cupiditate deleniti dignissimos distinctio dolor dolore error ex facere, hic iusto minus perferendis possimus praesentium quas sed sunt veritatis!</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <form onSubmit={submitUploadProduct}>
                                            <div className="form-group">
                                                <input
                                                    name="name"
                                                    value={product.name}
                                                    onChange={updateInput}
                                                    type="text" className="form-control" placeholder="Name" required/>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name="brand"
                                                    value={product.brand}
                                                    onChange={updateInput}
                                                    type="text" className="form-control" placeholder="Brand" required/>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-file">
                                                    <input
                                                        onChange={updateImage}
                                                        type="file" className="custom-file-input" id="customFile" required/>
                                                    <label className="custom-file-label" htmlFor="customFile">
                                                        {
                                                            product.image.length > 0 ?
                                                                <img src={product.image} alt="" width="20" height="30"/> : 'Product Image'
                                                        }
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <select
                                                    name="category"
                                                    value={product.category}
                                                    onChange={updateInput}
                                                    className="form-control" required>
                                                    <option value="">Select a Category</option>
                                                    <option value="MEN">Men's Wear</option>
                                                    <option value="WOMEN">Women's Wear</option>
                                                    <option value="KIDS">Kid's Wear</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name="price"
                                                    value={product.price}
                                                    onChange={updateInput}
                                                    type="number" className="form-control" placeholder="Price" required/>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name="qty"
                                                    value={product.qty}
                                                    onChange={updateInput}
                                                    type="number" className="form-control" placeholder="Qty" required/>
                                            </div>
                                            <div className="form-group">
                                    <textarea
                                        name="description"
                                        value={product.description}
                                        onChange={updateInput}
                                        rows="3" className="form-control" placeholder="Description" required/>
                                            </div>
                                            <div className="form-group">
                                    <textarea
                                        name="usage"
                                        value={product.usage}
                                        onChange={updateInput}
                                        rows="3" className="form-control" placeholder="Usage" required/>
                                            </div>
                                            <div>
                                                <input type="submit" className="btn btn-brown btn-sm text-dark" value="Upload"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment> :
                    <React.Fragment>
                        <section>
                            <div className="container p-3">
                                <div className="row">
                                    <div className="col">
                                        <p className="h3 text-danger">You are not Authorised to upload a product</p>
                                        <small>If you are an Admin, please contact your DBA to grant you the Admin access!</small>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }

        </React.Fragment>
    )
};
export default UploadProduct;