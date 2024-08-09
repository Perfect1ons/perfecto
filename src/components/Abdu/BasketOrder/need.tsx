// "use client";
// import React from "react";
// import Image from "next/image";
// import {
//   ArrowDropdown,
//   DeliverExPointIcons,
//   DeliveryApproveIcon,
//   DeliveryCurierIcon,
//   PaymentIcon,
// } from "../../../../public/Icons/Icons";
// import styles from "../style.module.scss";
// import { useState, ChangeEvent } from "react";
// import cn from "clsx";
// import InputMask from "react-input-mask";
// import {
//   BasketOrdersWarnings,
//   IBuyer,
//   ICityBuyer,
// } from "@/interfaces/baskets/basketModal";

// interface IBasketOrderProps {
//   buyer: IBuyer;
//   location: ICityBuyer;
//   setView: any;
//   openModal: () => void;
//   handleBuyerChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   authToken: string | undefined;
//   visible: any;
//   visibleHandler: any;
//   mask: any;
//   countryOptions: any;
//   currentCodeCountry: any;
//   totalQuantity: any;
//   handleAnotherRecipientBlur: any;
//   anotherStatus: any;
//   anotherRecipient: any;
//   handleAnotherRecipientChange: any;
//   ndsHandler: any;
//   orderHandler: any;
//   warnings: BasketOrdersWarnings;
//   formattedTotalPrice: any;
//   nds: any;
//   totalDiscount: any;
// }

// const BasketOrder = ({
//   buyer,
//   location,
//   setView,
//   openModal,
//   handleBuyerChange,
//   authToken,
//   visible,
//   visibleHandler,
//   mask,
//   countryOptions,
//   currentCodeCountry,
//   totalQuantity,
//   handleAnotherRecipientBlur,
//   anotherStatus,
//   anotherRecipient,
//   handleAnotherRecipientChange,
//   ndsHandler,
//   orderHandler,
//   warnings,
//   formattedTotalPrice,
//   nds,
//   totalDiscount,
// }: IBasketOrderProps) => {
//   const [anotherVisible, setAnotherVisible] = useState(false);

//   return (
//     <div className={styles.order_box}>
//       <div className={styles.currentButtonHeader}>
//         <button
//           className={cn(
//             styles.choose__delivery,
//             buyer.vid_dost != 0 && styles.choosed__delivery
//           )}
//           onClick={() => {
//             setView("curier"); // Устанавливаем вид для "curier"
//             openModal();
//           }}
//         >
//           <span className={styles.expoint}>
//             <DeliveryCurierIcon />
//           </span>
//           {buyer.vid_dost != 0 ? (
//             <div className={styles.delivery__info}>
//               <p className={styles.delivery__info_dostavka}>{buyer.dost}</p>
//               {buyer.id_city !== null &&
//                 buyer.vid_dost !== 1 &&
//                 buyer.vid_dost !== 2 && (
//                   <p className={styles.delivery__info_address}>
//                     Адрес: {buyer.city}
//                     {location.directory.street &&
//                       "," + location.directory.street}
//                     {location.directory.house && "," + location.directory.house}
//                     {location.directory.apartament &&
//                       "," + location.directory.apartament}
//                   </p>
//                 )}
//             </div>
//           ) : (
//             "Выберите способ доставки"
//           )}

//           {buyer.vid_dost != 0 ? (
//             <DeliveryApproveIcon />
//           ) : (
//             <DeliverExPointIcons />
//           )}
//         </button>
//         {warnings.delivery && (
//           <p className={styles.wrap_warning}>{warnings.delivery}</p>
//         )}
//       </div>
//       <div className={styles.currentButtonHeader}>
//         <button
//           className={cn(
//             styles.choose__delivery,
//             buyer.id_vopl != 0 && styles.choosed__delivery
//           )}
//           onClick={() => {
//             setView("oplata");
//             openModal();
//           }}
//         >
//           <span className={styles.expoint}>
//             <PaymentIcon />
//           </span>
//           {buyer.id_vopl != 0 ? buyer.oplata : "Выберите способ оплаты"}
//           {buyer.id_vopl != 0 ? (
//             <DeliveryApproveIcon />
//           ) : (
//             <DeliverExPointIcons />
//           )}
//         </button>
//         {warnings.payment && (
//           <p className={styles.wrap_warning}>{warnings.payment}</p>
//         )}
//       </div>
//       {!authToken && (
//         <div className="allContainerInput">
//           <div className={styles.wrap_phone}>
//             <div className={styles.wrap_phone_control}>
//               <InputMask
//                 mask={mask}
//                 value={buyer.tel}
//                 onChange={handleBuyerChange}
//                 className={styles.auth__input}
//               >
//                 {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
//                   <input
//                     autoComplete="off"
//                     {...inputProps}
//                     name="tel"
//                     placeholder="Телефон ( Обязательно )"
//                     type="text"
//                     required
//                   />
//                 )}
//               </InputMask>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   visibleHandler("country");
//                 }}
//                 className={styles.select__country}
//               >
//                 <span
//                   className={cn(
//                     visible === "country"
//                       ? styles.select__country_arrow__active
//                       : styles.select__country_arrow
//                   )}
//                 >
//                   <ArrowDropdown />
//                 </span>
//                 <Image
//                   className={styles.select__country_img}
//                   src={currentCodeCountry.img}
//                   width={30}
//                   height={30}
//                   alt={currentCodeCountry.name}
//                 />
//               </button>
//             </div>
//             {warnings.phone && (
//               <p className={styles.wrap_warning}>{warnings.phone}</p>
//             )}
//             {visible === "country" && (
//               <div className={styles.wrap_phone_dropdown}>{countryOptions}</div>
//             )}
//           </div>
//           <div className="containerInputLabel">
//             <div className="mail__label">
//               <input
//                 className="mail__inputField"
//                 value={buyer.fio}
//                 name="fio"
//                 type="text"
//                 id="fio"
//                 onChange={handleBuyerChange}
//                 required
//                 autoComplete="off"
//               />
//               <label htmlFor="fio" className="mail__inputLabel">
//                 Фамилия
//               </label>
//             </div>
//             {warnings.surname && (
//               <p className={styles.wrap_warning}>{warnings.surname}</p>
//             )}
//           </div>
//           <div className="containerInputLabel">
//             <div className="mail__label">
//               <input
//                 className="mail__inputField"
//                 value={buyer.name}
//                 name="name"
//                 type="text"
//                 id="name"
//                 onChange={handleBuyerChange}
//                 required
//                 autoComplete="off"
//               />
//               <label htmlFor="name" className="mail__inputLabel">
//                 Имя
//               </label>
//             </div>
//             {warnings.name && (
//               <p className={styles.wrap_warning}>{warnings.name}</p>
//             )}
//           </div>
//         </div>
//       )}
//       {authToken && (
//         <div className={styles.wrap_anotherRecipient}>
//           <button
//             onClick={() => setAnotherVisible(!anotherVisible)}
//             className={styles.wrap_anotherRecipient_dropdownToggler}
//           >
//             <span
//               className={cn(
//                 anotherVisible
//                   ? styles.wrap_anotherRecipient_dropdownToggler_arrow__active
//                   : styles.wrap_anotherRecipient_dropdownToggler_arrow
//               )}
//             >
//               <ArrowDropdown />
//             </span>
//             Другой получатель
//           </button>
//           <div
//             className={cn(
//               anotherVisible
//                 ? styles.wrap_anotherRecipient_dropdown__active
//                 : styles.wrap_anotherRecipient_dropdown
//             )}
//           >
//             {anotherVisible && (
//               <p
//                 className={cn(
//                   styles.wrap_anotherRecipient_dropdown__active_anotherStatus,
//                   anotherStatus &&
//                     styles.wrap_anotherRecipient_dropdown__active_anotherStatus_active,
//                   anotherStatus === "Пользователь не найден" &&
//                     styles.wrap_anotherRecipient_dropdown__active_anotherStatus_active_bad
//                 )}
//               >
//                 {anotherStatus}
//               </p>
//             )}

//             <div className="allContainerInput">
//               <div className={styles.wrap_phone}>
//                 <div className={styles.wrap_phone_control}>
//                   <InputMask
//                     mask={mask}
//                     value={anotherRecipient.tel}
//                     onChange={handleAnotherRecipientChange}
//                     className={styles.auth__input}
//                     onBlur={handleAnotherRecipientBlur}
//                   >
//                     {(
//                       inputProps: React.InputHTMLAttributes<HTMLInputElement>
//                     ) => (
//                       <input
//                         autoComplete="off"
//                         {...inputProps}
//                         name="tel"
//                         placeholder="Телефон ( Обязательно )"
//                         type="text"
//                         required
//                       />
//                     )}
//                   </InputMask>
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       visibleHandler("country");
//                     }}
//                     className={styles.select__country}
//                   >
//                     <span
//                       className={cn(
//                         visible === "country"
//                           ? styles.select__country_arrow__active
//                           : styles.select__country_arrow
//                       )}
//                     >
//                       <ArrowDropdown />
//                     </span>
//                     <Image
//                       className={styles.select__country_img}
//                       src={currentCodeCountry.img}
//                       width={30}
//                       height={30}
//                       alt={currentCodeCountry.name}
//                     />
//                   </button>
//                 </div>
//                 {visible === "country" && (
//                   <div className={styles.wrap_phone_dropdown}>
//                     {countryOptions}
//                   </div>
//                 )}
//               </div>
//               <div className="containerInputLabel">
//                 <div className="mail__label">
//                   <input
//                     className="mail__inputField"
//                     value={anotherRecipient.fio}
//                     name="fio"
//                     type="text"
//                     id="fio"
//                     onChange={handleAnotherRecipientChange}
//                     required
//                     autoComplete="off"
//                   />
//                   <label htmlFor="fio" className="mail__inputLabel">
//                     Фамилия
//                   </label>
//                 </div>
//               </div>
//               <div className="containerInputLabel">
//                 <div className="mail__label">
//                   <input
//                     className="mail__inputField"
//                     value={anotherRecipient.name}
//                     name="name"
//                     type="text"
//                     id="name"
//                     onChange={handleAnotherRecipientChange}
//                     required
//                     autoComplete="off"
//                   />
//                   <label htmlFor="name" className="mail__inputLabel">
//                     Имя
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className={styles.wrap_organization}>
//         <button
//           onClick={() => visibleHandler("organization")}
//           className={styles.wrap_organization_dropdownToggler}
//         >
//           <span
//             className={cn(
//               visible === "organization"
//                 ? styles.wrap_organization_dropdownToggler_arrow__active
//                 : styles.wrap_organization_dropdownToggler_arrow
//             )}
//           >
//             <ArrowDropdown />
//           </span>
//           Оформить на организацию
//         </button>
//         <div
//           className={cn(
//             visible === "organization"
//               ? styles.wrap_organization_dropdown__active
//               : styles.wrap_organization_dropdown
//           )}
//         >
//           <div className="allContainerInput">
//             <div className="mail__label">
//               <input
//                 value={buyer.org}
//                 name="org"
//                 className="mail__inputField"
//                 required
//                 id="org"
//                 type="text"
//                 onChange={handleBuyerChange}
//                 autoComplete="off"
//               />
//               <label htmlFor="org" className="mail__inputLabel">
//                 Название организации:
//               </label>
//             </div>
//             <div className="mail__label">
//               <input
//                 value={buyer.org_inn}
//                 name="org_inn"
//                 className="mail__inputField"
//                 required
//                 id="org_inn"
//                 type="text"
//                 onChange={handleBuyerChange}
//                 autoComplete="off"
//               />
//               <label htmlFor="org_inn" className="mail__inputLabel">
//                 ИНН:
//               </label>
//             </div>
//           </div>
//           <div className={styles.wrap_organization_dropdown_nds}>
//             <label
//               htmlFor="nds"
//               className={styles.wrap_organization_dropdown_nds_switch}
//             >
//               <input id="nds" onClick={ndsHandler} type="checkbox" />
//               <span
//                 className={styles.wrap_organization_dropdown_nds_switch__slider}
//               ></span>
//             </label>
//             <p className={styles.wrap_organization_dropdown_nds_title}>
//               Включить НДС
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className={styles.wrap_price}>
//         <div className={styles.wrap_price_good}>
//           <p className={styles.wrap_price_good_count}>
//             Товары, {totalQuantity} шт.
//           </p>
//           <p className={styles.wrap_price_good_finalPrice}>
//             {formattedTotalPrice} c.
//           </p>
//         </div>
//         {totalDiscount > 0 && (
//           <div className={styles.wrap_price_good}>
//             <p className={styles.wrap_price_good_count}>Всего вы экономите</p>
//             <p className={styles.wrap_price_good_finalPrice}>
//               {totalDiscount.toLocaleString("ru-RU")} c.
//             </p>
//           </div>
//         )}
//         {visible === "organization" && nds && (
//           <div className={styles.wrap_price_nds}>
//             <p className={styles.wrap_price_nds_text}>В т.ч НДС:</p>
//             <p className={styles.wrap_price_nds_price}>329.20 c.</p>
//           </div>
//         )}
//         <div className={styles.wrap_price_priceTotal}>
//           <p className={styles.wrap_price_priceTotal_totalTitle}>Итого: </p>
//           <p className={styles.wrap_price_priceTotal_price}>
//             {formattedTotalPrice} c.
//           </p>
//         </div>
//       </div>
//       <button
//         onClick={orderHandler}
//         aria-label="order request"
//         className={styles.wrap_orderRequest}
//       >
//         оформить заказ
//       </button>
//       <p className={styles.wrap_privacy}>
//         Согласен с использованием Правил пользования торговой площадкой и
//         правилами возврата
//       </p>
//     </div>
//   );
// };

// export default BasketOrder;
