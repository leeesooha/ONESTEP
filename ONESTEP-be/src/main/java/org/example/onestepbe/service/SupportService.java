package org.example.onestepbe.service;

import lombok.RequiredArgsConstructor;
import org.example.onestepbe.mapper.SupportMapper;
import org.example.onestepbe.model.Support;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupportService {
    private final SupportMapper supportMapper;

    public List<Support> getSupports(String category, String region) {
        return supportMapper.findAll(category, region);
    }
}
