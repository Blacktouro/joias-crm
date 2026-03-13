using Microsoft.EntityFrameworkCore;
using JoiasCRM.Models;

namespace JoiasCRM.Data
{
    public class AppDbContext : DbContext
    
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Peca> Pecas { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        
    }
}