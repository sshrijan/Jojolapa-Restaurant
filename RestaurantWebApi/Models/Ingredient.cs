// Models/Ingredient.cs
namespace RestaurantWebApi.Models
{
    // Add this enum
    public enum UnitType
    {
        Grams = 1,
        Kilograms = 2,
        Milliliters = 3,
        Liters = 4,
        Pieces = 5,
        Cups = 6,
        Tablespoons = 7,
        Teaspoons = 8
    }

    public class Ingredient : BaseEntity
    {
        public string Name { get; set; }
        public decimal QuantityInStock { get; set; }
        public UnitType Unit { get; set; }
    }
}