namespace JoiasCRM.Models
{
    public class Lote
    {
        public int Id { get; set; }

        public string CodigoLote { get; set; }

        public DateTime DataCompra { get; set; }

        public string Fornecedor { get; set; }

        public decimal ValorReal { get; set; }

        public decimal ValorEuro { get; set; }

        public int NumeroPecas { get; set; }

        public decimal ValorAlfandega { get; set; }

        public decimal ValorTransporte { get; set; }

        public string Transportadora { get; set; }

        public int DiasEntrega { get; set; }

        public string Estado { get; set; }
    }
}