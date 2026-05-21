// Services/MenuItemService.cs
using Microsoft.EntityFrameworkCore;
using RestaurantWebApi.Data;
using RestaurantWebApi.DTOs;
using RestaurantWebApi.Models;
using RestaurantWebApi.Services.Interfaces;

namespace RestaurantWebApi.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly AppDbContext _context;

        public MenuItemService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MenuItemResponseDto>> GetAllMenuItemsAsync()
        {
            var menuItems = await _context.MenuItems
                .Include(m => m.Category)
                .Include(m => m.MenuItemIngredients)
                    .ThenInclude(mi => mi.Ingredient)
                .ToListAsync();

            return menuItems.Select(m => MapToResponseDto(m));
        }

        public async Task<MenuItemResponseDto> GetMenuItemByIdAsync(Guid id)
        {
            var menuItem = await _context.MenuItems
                .Include(m => m.Category)
                .Include(m => m.MenuItemIngredients)
                    .ThenInclude(mi => mi.Ingredient)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (menuItem == null)
                return null;

            return MapToResponseDto(menuItem);
        }

        public async Task<MenuItemResponseDto> CreateMenuItemAsync(MenuItemCreateDto createDto)
        {
            // Validate Category exists
            var category = await _context.Categories.FindAsync(createDto.CategoryId);
            if (category == null)
                throw new ArgumentException($"Category with ID {createDto.CategoryId} not found");

            // Validate all ingredients exist
            if (createDto.Ingredients != null)
            {
                foreach (var ingredientDto in createDto.Ingredients)
                {
                    var ingredient = await _context.Ingredients.FindAsync(ingredientDto.IngredientId);
                    if (ingredient == null)
                        throw new ArgumentException($"Ingredient with ID {ingredientDto.IngredientId} not found");
                }
            }

            // Create MenuItem
            var menuItem = new MenuItem
            {
                Id = Guid.NewGuid(),
                Name = createDto.Name,
                Description = createDto.Description,
                Price = createDto.Price,
                CategoryId = createDto.CategoryId,
                IsAvailable = createDto.IsAvailable,
                CreatedAt = DateTime.UtcNow,
                MenuItemIngredients = new List<MenuItemIngredient>()
            };

            // Add Ingredients if provided
            if (createDto.Ingredients != null && createDto.Ingredients.Any())
            {
                menuItem.MenuItemIngredients = createDto.Ingredients.Select(i => new MenuItemIngredient
                {
                    Id = Guid.NewGuid(),
                    MenuItemId = menuItem.Id,
                    IngredientId = i.IngredientId,
                    QuantityRequired = i.QuantityRequired,
                    CreatedAt = DateTime.UtcNow
                }).ToList();
            }

            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();

            // Load navigation properties
            await _context.Entry(menuItem)
                .Reference(m => m.Category)
                .LoadAsync();

            await _context.Entry(menuItem)
                .Collection(m => m.MenuItemIngredients)
                .Query()
                .Include(mi => mi.Ingredient)
                .LoadAsync();

            return MapToResponseDto(menuItem);
        }

        public async Task<MenuItemResponseDto> UpdateMenuItemAsync(Guid id, MenuItemUpdateDto updateDto)
        {
            var menuItem = await _context.MenuItems
                .Include(m => m.MenuItemIngredients)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (menuItem == null)
                return null;

            // Validate Category exists
            var category = await _context.Categories.FindAsync(updateDto.CategoryId);
            if (category == null)
                throw new ArgumentException($"Category with ID {updateDto.CategoryId} not found");

            // Update basic properties
            menuItem.Name = updateDto.Name;
            menuItem.Description = updateDto.Description;
            menuItem.Price = updateDto.Price;
            menuItem.CategoryId = updateDto.CategoryId;
            menuItem.IsAvailable = updateDto.IsAvailable;
            menuItem.UpdatedAt = DateTime.UtcNow;

            // Update ingredients (remove old, add new)
            if (menuItem.MenuItemIngredients != null && menuItem.MenuItemIngredients.Any())
            {
                _context.MenuItemIngredients.RemoveRange(menuItem.MenuItemIngredients);
            }

            if (updateDto.Ingredients != null && updateDto.Ingredients.Any())
            {
                menuItem.MenuItemIngredients = updateDto.Ingredients.Select(i => new MenuItemIngredient
                {
                    Id = Guid.NewGuid(),
                    MenuItemId = menuItem.Id,
                    IngredientId = i.IngredientId,
                    QuantityRequired = i.QuantityRequired,
                    CreatedAt = DateTime.UtcNow
                }).ToList();
            }
            else
            {
                menuItem.MenuItemIngredients = new List<MenuItemIngredient>();
            }

            await _context.SaveChangesAsync();

            // Load navigation properties for response
            await _context.Entry(menuItem)
                .Reference(m => m.Category)
                .LoadAsync();

            await _context.Entry(menuItem)
                .Collection(m => m.MenuItemIngredients)
                .Query()
                .Include(mi => mi.Ingredient)
                .LoadAsync();

            return MapToResponseDto(menuItem);
        }

        public async Task<bool> DeleteMenuItemAsync(Guid id)
        {
            var menuItem = await _context.MenuItems
                .Include(m => m.MenuItemIngredients)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (menuItem == null)
                return false;

            // Remove ingredients first (due to foreign key constraint)
            if (menuItem.MenuItemIngredients != null && menuItem.MenuItemIngredients.Any())
            {
                _context.MenuItemIngredients.RemoveRange(menuItem.MenuItemIngredients);
            }

            _context.MenuItems.Remove(menuItem);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateAvailabilityAsync(Guid id, bool isAvailable)
        {
            var menuItem = await _context.MenuItems.FindAsync(id);
            if (menuItem == null)
                return false;

            menuItem.IsAvailable = isAvailable;
            menuItem.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        private MenuItemResponseDto MapToResponseDto(MenuItem menuItem)
        {
            return new MenuItemResponseDto
            {
                Id = menuItem.Id,
                Name = menuItem.Name,
                Description = menuItem.Description,
                Price = menuItem.Price,
                CategoryId = menuItem.CategoryId,
                CategoryName = menuItem.Category?.Name,
                IsAvailable = menuItem.IsAvailable,
                CreatedAt = menuItem.CreatedAt,
                UpdatedAt = menuItem.UpdatedAt,
                Ingredients = menuItem.MenuItemIngredients?.Select(i => new MenuItemIngredientResponseDto
                {
                    IngredientId = i.IngredientId,
                    IngredientName = i.Ingredient?.Name,
                    QuantityRequired = i.QuantityRequired,
                    Unit = i.Ingredient?.Unit ?? UnitType.Grams, // Default to Grams instead of None
                    QuantityInStock = i.Ingredient?.QuantityInStock ?? 0
                }).ToList() ?? new List<MenuItemIngredientResponseDto>()
            };
        }
    }
}