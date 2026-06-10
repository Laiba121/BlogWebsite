import MedicineCard from "./MedicineCard";
import { medicines } from "../data/medicines";

const MedicineGrid = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
        />
      ))}
    </div>
  );
};

export default MedicineGrid;