using System;
using System.Collections.Generic;
using System.Linq;
using TestAngular.Models;

namespace TestAngular.CRUDS
{
    public class PositionDao
    {
        public PositionDao()
        {
        }

        public List<Position> getPositionList()
        {
            using (var rpt = new AngularTestContext())
            {
                try
                {
                    var result = rpt.Positions.ToList();

                    return result;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
