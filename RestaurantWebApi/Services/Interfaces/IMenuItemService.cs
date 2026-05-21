// Services/Interfaces/IMenuItemService.cs
using RestaurantWebApi.DTOs;

namespace RestaurantWebApi.Services.Interfaces
{
    public interface IMenuItemService
    {
        Task<IEnumerable<MenuItemResponseDto>> GetAllMenuItemsAsync();
        Task<MenuItemResponseDto> GetMenuItemByIdAsync(Guid id);
        Task<MenuItemResponseDto> CreateMenuItemAsync(MenuItemCreateDto createDto);
        Task<MenuItemResponseDto> UpdateMenuItemAsync(Guid id, MenuItemUpdateDto updateDto);
        Task<bool> DeleteMenuItemAsync(Guid id);
        Task<bool> UpdateAvailabilityAsync(Guid id, bool isAvailable);
    }
}