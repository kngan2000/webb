import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import Dialog from "../Dialog";

const ContactInfo = () => {

  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const {item} = useParams();
  const [idShow, setIdShow] = useState(null);
  const [dialog, setDialog] = useState(false);

  const headerStyle = {
    fontSize: "1.3rem",
    fontFamily: "SVN-Futura Medium, sans-serif",
    marginBottom: "2.3rem",
    textTransform: "uppercase",
  };

  const linkStyle = {
    fontStyle: "bold",
    fontSize: "1rem",
    fontWeight: "800",
    wordWrap:"break-word",
    color: "black"
  }

  const titleStyle = {
    font: "inherit",
    wordWrap:"break-word",
    textTransform: "capitalize"
  }

  const liStyle = {
    font: "inherit",
    width:"parent",
    marginBottom: "2.3rem"
  }

  function redirectPage(_id) {
    setIdShow(href);
    setDialog(true);
  }

  useEffect(() => {
    return new Promise(async () => {
      const res = await axios.get("/api/category/all/status");
      if (res.status === 200) {
        setCategories(res.data);
      }
    });
  }, [categories]);

  // return (
  //   <div className="contactInfo container">
  //     <div className="row">
  //       <div className="col-12 col-md-4 contact-Box">
  //         <div className="box-info">
  //           <div className="info-image">
  //             <i className="fas fa-phone-alt"></i>
  //           </div>
  //           <h5>Facebook</h5>
  //           <a href="">
  //             <p>Clothes Store</p>
  //           </a>
  //         </div>
  //       </div>
  //       <div className="col-12 col-md-4 contact-Box">
  //         <div className="box-info">
  //           <div className="info-image">
  //             <i className="fas fa-map-marker-alt"></i>
  //           </div>
  //           <h5>Location</h5>
  //           <a href="https://goo.gl/maps/1BtmWsWyZQBZMrdB9">
  //             <p className="location">30/4 Street, Hung Loi Ward</p>
  //           </a>
  //         </div>
  //       </div>
  //       <div className="col-12 col-md-4 contact-Box">
  //         <div className="box-info">
  //           <div className="info-image">
  //             <i className="fas fa-fax"></i>
  //           </div>
  //           <h5>Zalo</h5>
  //           <a href="https://zalo.me/012345678">
  //             <p>0822 208 604</p>
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );


  return (
    <>
      <footer style={
        {
          width: "75%",
          display: "flex",
          padding: "0",
          margin: "50px auto",
          flexWrap: "wrap"
        }
      }>

        <ul style={
          {
            width: "25%",
            listStyleType: "none"
          }
        }
        >
          <h2 style={headerStyle}>Contact</h2>
          <li style={liStyle}>
            <h2 style={titleStyle}>Hotline</h2>
            <a style={linkStyle} href="tel:0822208604">0822 208 604</a>
          </li>
          <li style={liStyle}>
            <h2 style={titleStyle}>Email</h2>
            <a style={linkStyle} href="mailto:nganntkgcv19060@fpt.edu.vn">nganntkgcv19060@fpt.edu.vn</a>
          </li>
          <li style={liStyle}>
            <h2 style={titleStyle}>Email For Job</h2>
            <a style={linkStyle} href="mailto:kieungann0711@gmail.com">kieungann0711@gmail.com</a>
          </li>

        </ul>
        <ul style={
          {
            width: "25%",
            listStyleType: "none"
          }
        }>
          <h2 style={headerStyle}>Categories</h2>
          {categories.map((i) => (
            <li
              key={i._id}
              style={liStyle}

              // onClick={() => redirectPage(i._id)}
            >
              <h3 style={titleStyle}> {i.name}</h3>

            </li>
          ))}
        </ul>
        <ul style={{
          width: "25%",
          listStyleType: "none"
        }}>
          <h2 style={headerStyle}>Support</h2>
          <li style={liStyle}><a
            style={titleStyle}
            href="https://levents.asia/my-account/">Account</a></li>
          <li style={liStyle}><a
            style={titleStyle}
            href="https://levents.asia/chinh-sach-van-chuyen/">Delivery and Shipment Policy</a></li>
          <li style={liStyle}><a
            style={titleStyle}
            href="https://levents.asia/thanh-toan-online/">Online Payments</a></li>
          <li style={liStyle}><a
            style={titleStyle}
            href="https://levents.asia/customer-care/chinh-sach-bao-mat/">Privacy Policy</a></li>
          <li style={liStyle}><a
            style={titleStyle}
            href="https://levents.asia/customer-care/storage-instructions-copy-copy-copy/">Warranty Policy</a></li>
          <li style={liStyle}><a
            style={titleStyle}
            href="https://levents.asia/quy-trinh-giai-quyet-khieu-nai-khach-hang/"
          >Complaint Policy</a></li>
        </ul>
        <ul style={
          {
            width: "25%",
            listStyleType: "none",
          }
        }>
          <h2 style={{
            fontSize: "1.3rem",
            // fontFamily: "SVN-Futura Medium, sans-serif",
            marginBottom: "2.3rem",
            fontWeight: "400",
            textTransform: "uppercase"
          }}>Stores</h2>

          <li style={liStyle}>160 Street 30/4, Hung Loi Ward, Ninh Kieu District, Can Tho City</li>

          <div style={
            {display: "flex"}
          }>
            <li style={{
              marginRight: "20px"
            }}>
              <a href="https://www.facebook.com/Leventsbrand">
                <img src="https://levents.asia/template/assets/images/svg/ic-fb.svg" alt=""/>
              </a>
            </li>
            <li style={{
              marginRight: "20px"
            }}>
              <a href="https://instagram.com/levents.official?igshid=YmMyMTA2M2Y=">
                <img src="https://levents.asia/template/assets/images/svg/ic-ins.svg" alt=""/>
              </a>
            </li>
            <li style={{
              marginRight: "20px"
            }}>
              <a href="https://vt.tiktok.com/ZSdBbf2fb/">
                <img src="https://levents.asia/template/assets/images/svg/ic-tt.svg" alt=""/>
              </a>
            </li>
            <li style={{
              marginRight: "20px"
            }}>
              <a href="https://youtube.com/channel/UChl4KY_EpOg4GAjrtKlu_vw">
                <img src="https://levents.asia/template/assets/images/svg/ic-yt.svg" alt=""/>
              </a>
            </li>
          </div>

        </ul>

      </footer>
      {idShow && (
        <Dialog
          isOpenDialog={dialog}
          setCloseDialog={() => setDialog(false)}
          idParent={idShow}
        />
      )}
    </>


  )
};

export default ContactInfo;
