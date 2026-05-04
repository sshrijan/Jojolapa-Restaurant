namespace RestaurantWebApi.Models
{
    public class Ingredient : BaseEntity
    {
        public string Name { get; set; }
        public decimal QuantityInStock { get; set; }
        public UnitType Unit {  get; set; }
    }
}
