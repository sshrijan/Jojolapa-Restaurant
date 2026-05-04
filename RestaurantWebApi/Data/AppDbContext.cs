using Microsoft.EntityFrameworkCore;
using RestaurantWebApi.Models;

namespace RestaurantWebApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }
            public DbSet<User> Users { get; set; }
            public DbSet<Role> Roles { get; set; }

            public DbSet<Restaurant> Restaurants { get; set; }
            public DbSet<Branch> Branches { get; set; }

            public DbSet<Table> Tables { get; set; }

            public DbSet<Category> Categories { get; set; }
            public DbSet<MenuItem> MenuItems { get; set; }

            public DbSet<Ingredient> Ingredients { get; set; }
            public DbSet<MenuItemIngredient> MenuItemIngredients { get; set; }

            public DbSet<Order> Orders { get; set; }
            public DbSet<OrderItem> OrderItems { get; set; }

            public DbSet<Payment> Payments { get; set; }
            public DbSet<Reservation> Reservations { get; set; }

            public DbSet<AuditLog> AuditLogs { get; set; }
    }
    
}
