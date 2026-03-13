using Microsoft.AspNetCore.Mvc;
using JoiasCRM.Models;
using JoiasCRM.Data;

namespace JoiasCRM.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LotesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetLotes()
        {
            var lotes = _context.Lotes.ToList();
            return Ok(lotes);
        }
    }
}