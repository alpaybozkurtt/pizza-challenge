import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import Check from "./Check";
import Sayac from "./Sayac";
import axios from "axios";

// UseState Objeleri

const startingErrors = {
  pizzaSize: true,
  pizzaHamuru: true,
  ekMalzeme: true,
  customerName: true,
};

const startingForm = {
  pizzaSize: "orta",
  pizzaHamuru: "klasik",
  ekMalzeme: [],
  customerName: "",
  siparisNotu: "",
  adet: 1,
};

// Ek Malzemeler Arrayi
const malzemeler = [
  { value: "pepperoni", label: "Pepperoni" },
  { value: "sosis", label: "Sosis" },
  { value: "kanada jambonu", label: "Kanada Jambonu" },
  { value: "tavuk ızgara", label: "Tavuk Izgara" },
  { value: "soğan", label: "Soğan" },
  { value: "domates", label: "Domates" },
  { value: "mısır", label: "Mısır" },
  { value: "sucuk", label: "Sucuk" },
  { value: "jalepeno", label: "Jalepeno" },
  { value: "sarımsak", label: "Sarımsak" },
  { value: "biber", label: "Biber" },
  { value: "ananas", label: "Ananas" },
  { value: "kabak", label: "Kabak" },
  { value: "mantar", label: "Mantar" },
  { value: "zeytin", label: "Zeytin" },
];

export default function OrderForm() {

  //UseState Hookları
  const [form, setForm] = useState(startingForm);
  const history = useHistory();
  const [isValid, setIsValid] = useState(false);
  const [count, setCount] = useState(1);
  const [fiyat, setFiyat] = useState(0);
  const [errors, setErrors] = useState(startingErrors);


  //handleChange Fonksiyonu
  const handleChange = (event) => {
    const { name, checked, value } = event.target;
    let newValue;
    if (name === "ekMalzeme") {
      const oldValues = form.ekMalzeme;
      if (checked) {
        newValue = [...oldValues, value]; 
      } else {
        newValue = oldValues.filter((v) => v !== value); 
      }
      setErrors({
        ...errors,
        ekMalzeme: 4 > newValue.length || newValue.length > 10,
      });
    } else {
      newValue = value;
      if (name === "pizzaSize" || name === "pizzaHamuru") {
        setErrors({
          ...errors,
          [name]: value === "",
        });
      }
    }

    setForm({ ...form, [name]: newValue });
    if (name == "customerName") {
      if (value.replaceAll(" ", "").length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  //handleSubmit Fonksiyonu
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    axios
      .post("https://reqres.in/api/pizza", form)
      .then((res) => {
        console.log(res.data); 
        const { id, createdAt } = res.data;
        console.log("Sipariş Özeti:");
        console.log("ID:", id);
        console.log("Oluşturulma Tarihi:", createdAt);
        setForm(startingForm);
        setFiyat(0);
        setCount(1);
        history.push("/SiparisAlindi");
      })
      .catch((err) => console.log(err));
  };

  //Fiyat State'ini güncelleyen updatePrice Fonksiyonu
  const updatePrice = () => {
    let newFiyat = form.adet * (85.5 + form.ekMalzeme.length * 5);
    setFiyat(newFiyat);
  };

  // Form her yenilendiğinde updatePrice Fonksiyonunu tetikleyen useEffect Hooku
  useEffect(() => {
    updatePrice();
  }, [form]);

  //handleCountChange Fonksiyonu
  const handleCountChange = (newCount) => {
    setForm({ ...form, adet: newCount });
  };

  //Errorların State'ine göre Validasyon güncelleyen useEffect Hooku
  useEffect(() => {
    setIsValid(
      !errors.ekMalzeme &&
        !errors.pizzaSize &&
        !errors.pizzaHamuru &&
        !errors.customerName
    );
  }, [errors]);

  //Return 
  return (
    <>
      <div className="header">
        <h1>Teknolojik Yemekler</h1>
        <p><a href="/">Anasayfa</a> - Sipariş Oluştur</p>
      </div>
      <Form className="formContainer" onSubmit={handleSubmit}>
        <h3>Position Absolute Acı Pizza</h3>
        <div className="rating-container">
          <div className="price">85.50₺</div>
          <div className="rating">
            <span>4.9</span>
            <span>(200)</span>
          </div>
        </div>

        <p className="infoText">
          Frontent Dev olarak hala position:absolute kullaniyorsan bu çok acı
          pizza tam sana göre. Pizza. domates, peynir ve genellikle çeşitli
          diger malzemelerle kaplanmış. daha sonra geleneksel olarak odun
          ateşinde bir firinda yüksek sicaklkta pişirilen, genellikle yuvarlak,
          düzieştirilmiş mayalı bugday bazlı hamurdan oluşan italyan kökenli
          lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>
        <div className="pizza-size-container">
          <div className="pizza-size-card">
            <h3>
              Boyut Seç <span>*</span>
            </h3>
            {errors.pizzaSize && (
              <p style={{ color: "red" }}>Lütfen bir boyut seçin.</p>
            )}
            <FormGroup>
              <Input
                id="küçük"
                type="radio"
                name="pizzaSize"
                value="Küçük"
                onChange={handleChange}
                checked={form.pizzaSize === "Küçük"}
              />
              <Label htmlFor="küçük">Küçük</Label>
            </FormGroup>

            <FormGroup>
              <Input
                id="orta"
                type="radio"
                name="pizzaSize"
                value="Orta"
                onChange={handleChange}
                checked={form.pizzaSize === "Orta"}
              />
              <Label htmlFor="orta">Orta</Label>
            </FormGroup>

            <FormGroup>
              <Input
                id="büyük"
                type="radio"
                name="pizzaSize"
                value="Büyük"
                onChange={handleChange}
                checked={form.pizzaSize === "Büyük"}
              />
              <Label htmlFor="büyük">Büyük</Label>
            </FormGroup>
          </div>

          <div className="pizza-dough-card">
            <h3>
              Hamur Seç<span>*</span>
            </h3>
            {errors.pizzaHamuru && (
              <p style={{ color: "red" }}>Lütfen bir hamur türü seçin.</p>
            )}
            <FormGroup>
              <select
                type="select"
                name="pizzaHamuru"
                onChange={handleChange}
                value={form.pizzaHamuru}
              >
                <option value="klasik">Klasik Hamur</option>
                <option value="ince">İnce Hamur</option>
              </select>
            </FormGroup>
          </div>
        </div>

        <h3>Ek Malzemeler</h3>
        {errors.ekMalzeme && (
          <p style={{ color: "red" }}>
            En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺
          </p>
        )}
        <div className="malzemeler-container">
          {malzemeler.map((malzeme, index) => {
            return (
              <Check
                key={index}
                changeFn={handleChange}
                isChecked={form.ekMalzeme.includes(malzeme.value)}
                value={malzeme.value}
                label={malzeme.label}
                name="ekMalzeme"
                className="malzeme-label"
                data-cy={`malzeme-${malzeme.value}`} // 2. Cypress testi için ekleme - ÇALIŞMIYOR ( açıklama pizza.cy.js'te.) 


              />
            );
          })}
        </div>
        <div className="input-container">
        <h3>İsim - Soyisim</h3>
          <Input
            type="textarea"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            data-cy="customerNameInput" // 1. cypress testi için attribute eklemesi
          />
          {errors.customerName && (
            <p style={{ color: "red" }}>
              Lütfen geçerli bir isim ve soyisim giriniz.
            </p>
          )}
          <h3>Sipariş Notu</h3>
          <Input
            type="textarea"
            name="siparisNotu"
            value={form.siparisNotu}
            onChange={handleChange}
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            id="textArea"
          />
        </div>
        <hr />

        <div className="siparis-container">
          <div className="counter-button">
            <Sayac
              onCountChange={handleCountChange}
              count={count}
              setCount={setCount}
              data-cy="artir"
            />
          </div>

          <div className="siparis-toplam">
            <h3>Sipariş Toplamı</h3>
            <div className="price-container">
              <div className="fiyatlar grey">
                <p>Seçimler</p>
                <p>{form.ekMalzeme.length * 5}₺</p>
              </div>
              <div className="fiyatlar red">
                <p>Toplam</p>
                <p>{fiyat}₺</p>
              </div>
            </div>

            <button className="submit-button" disabled={!isValid}>
              Sipariş Ver
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}