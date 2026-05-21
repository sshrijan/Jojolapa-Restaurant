// DTOs/MenuItemDto.cs
using RestaurantWebApi.Models;

namespace RestaurantWebApi.DTOs
{
    public class MenuItemCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public Guid CategoryId { get; set; }
        public bool IsAvailable { get; set; }
        public List<MenuItemIngredientDto> Ingredients { get; set; }
    }

    public class MenuItemUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public Guid CategoryId { get; set; }
        public bool IsAvailable { get; set; }
        public List<MenuItemIngredientDto> Ingredients { get; set; }
    }

    public class MenuItemIngredientDto
    {
        public Guid IngredientId { get; set; }
        public decimal QuantityRequired { get; set; }
    }

    public class MenuItemResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public bool IsAvailable { get; set; }
        public List<MenuItemIngredientResponseDto> Ingredients { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class MenuItemIngredientResponseDto
    {
        public Guid IngredientId { get; set; }
        public string IngredientName { get; set; }
        public decimal QuantityRequired { get; set; }
        public UnitType Unit { get; set; }
        public decimal QuantityInStock { get; set; }
        public bool IsSufficientStock => QuantityInStock >= QuantityRequired;
    }
}