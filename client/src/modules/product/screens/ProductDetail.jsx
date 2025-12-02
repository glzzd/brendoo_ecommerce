import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Ürün Detayı</h2>
      <p>Ürün ID: {id}</p>
    </div>
  );
}

export default ProductDetail;