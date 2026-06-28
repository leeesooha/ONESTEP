package org.example.onestepbe.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.example.onestepbe.model.Support;

import java.util.List;

@Mapper
public interface SupportMapper {
    List<Support> findAll(@Param("category") String category, @Param("region") String region);
}
