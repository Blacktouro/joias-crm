using Microsoft.AspNetCore.Mvc;
using JoiasCRM.Data;
using JoiasCRM.Models;

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

        [HttpPost]
        public IActionResult Criar([FromBody] Lote lote)
        {
            lote.DataCompra = DateTime.Now;
            _context.Lotes.Add(lote);
            _context.SaveChanges();

            return Ok(lote);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var lote = _context.Lotes.Find(id);

            if (lote == null)
                return NotFound();

            _context.Lotes.Remove(lote);
            _context.SaveChanges();

            return Ok();
        }
    }
}