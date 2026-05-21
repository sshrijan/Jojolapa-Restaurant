namespace RestaurantWebApi.Models
{
    public class MenuItem : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
        public bool IsAvailable { get; set; }
        public ICollection<MenuItemIngredient> MenuItemIngredients { get; set; }

    }
}
