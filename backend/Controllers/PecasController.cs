using Microsoft.AspNetCore.Mvc;
using JoiasCRM.Data;
using JoiasCRM.Models;

namespace JoiasCRM.Controllers
{

[ApiController]
[Route("api/[controller]")]
public class PecasController : ControllerBase
{

    private readonly AppDbContext _context;

    public PecasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Pecas.ToList());
    }

    [HttpPost]
    public IActionResult Add(Peca p)
    {
        _context.Pecas.Add(p);
        _context.SaveChanges();

        return Ok(p);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var p = _context.Pecas.Find(id);

        if (p == null)
            return NotFound();

        _context.Pecas.Remove(p);
        _context.SaveChanges();

        return Ok();
    }
}
}