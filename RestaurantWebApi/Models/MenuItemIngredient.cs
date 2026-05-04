namespace RestaurantWebApi.Models
{
    public class MenuItemIngredient : BaseEntity
    {
        public Guid MenuItemId { get; set; }
        public MenuItem MenuItem { get; set; }
        public Guid IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
        public decimal QuantityRequired { get; set; }
    }
}
